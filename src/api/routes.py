from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import firebase_admin
from firebase_admin import credentials, db, auth
import requests
from requests import Session
from requests.exceptions import HTTPError
import json
from random import seed
from random import randint
import datetime
import os

apiKey = os.getenv('API_KEY_FIREBASE') 
cred = credentials.Certificate('/workspace/prueba-front-write/firebase-key.json')
firebaseDatabase = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://write-me-in-default-rtdb.firebaseio.com/'
})

api = Blueprint('api', __name__)

def confirm_access(session_cookie):
    if not session_cookie:
        return {"code": 422}
    try:
        decoded_claims = auth.verify_session_cookie(session_cookie, check_revoked=True)
        return {"user_id":decoded_claims["uid"], "code": 200}
    except auth.InvalidSessionCookieError:
        return {"code": 422}

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    request_ref = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={}".format(apiKey)
    headers = {"content-type": "application/json"}
    data =  json.dumps({"email": email, "password": password, "returnSecureToken": True})
    request_object = requests.post(request_ref, headers=headers, data=data)
    request_object = request_object.json()
    try:
        id_token = request_object['idToken']
        expires_in = datetime.timedelta(days=5)
        session_cookie = auth.create_session_cookie(id_token, expires_in=expires_in)
        return jsonify({"cookie": session_cookie, "displayName": request_object["displayName"]}), 200
    except:
            return jsonify({"error": "ok"}), 401

@api.route("/reset-password", methods=["POST"])
def reset_password():
    email = request.json.get("email", None)

    request_ref = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key={}".format(apiKey)
    headers = {"content-type": "application/json"}
    data =  json.dumps({"requestType":"PASSWORD_RESET","email":email})
    request_object = requests.post(request_ref, headers=headers, data=data)
    request_object = request_object.json()
    try:
        email = request_object['email']
        return jsonify({}), 200
    except:
            return jsonify({"error": "ok"}), 400

@api.route("user/info", methods=["GET"])
def get_user_data():
    session_cookie = request.headers.get('Authorization')
    if not session_cookie:
        return jsonify({"code": 422}), 422

    try:
        decoded_claims = auth.verify_session_cookie(session_cookie, check_revoked=True)
        return jsonify({"user_id":decoded_claims["uid"], "name": decoded_claims["name"], "email":decoded_claims["email"]}), 200
    except auth.InvalidSessionCookieError:
        return jsonify({"code": 422}), 422

@api.route("/edit-profile", methods=["PUT"])
def edit_user_data():
    user = request.json.get("user", None)
    current_password = request.json.get("current_password", None)
    session_cookie = request.headers.get('Authorization')

    headers = {"content-type": "application/json"}

    try:
        old_data = auth.verify_session_cookie(session_cookie, check_revoked=True)
        request_ref = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={}".format(apiKey)
        data =  json.dumps({"email": old_data["email"], "password": current_password, "returnSecureToken": True})
        request_object = requests.post(request_ref, headers=headers, data=data)
        request_object = request_object.json()
        id_token = request_object['idToken']
    except auth.InvalidSessionCookieError:
        return jsonify({"msg": "Unathorized"}), 422
    

    try:
        if user["name"] and user["name"] != "" and user["name"] != old_data["name"]:
            request_ref = "https://identitytoolkit.googleapis.com/v1/accounts:update?key={}".format(apiKey)
            data =  json.dumps({"idToken": id_token,"displayName":user["name"],"returnSecureToken":True})
            request_object = requests.post(request_ref, headers=headers, data=data)
            request_object = request_object.json()
            
    except :
        return jsonify({"msg": "Try again!"}), 400

    try:
        if user["email"] and user["email"] != "" and user["email"] != old_data["email"]:
            request_ref = "https://identitytoolkit.googleapis.com/v1/accounts:update?key={}".format(apiKey)
            data =  json.dumps({"idToken": id_token,"email":user["email"],"returnSecureToken":True})
            request_object = requests.post(request_ref, headers=headers, data=data)
            request_object = request_object.json()
            
    except :
        return jsonify({"msg": "Email already in use."}), 400

    try:
        if user["password"] and user["password"] != "":
            request_ref = "https://identitytoolkit.googleapis.com/v1/accounts:update?key={}".format(apiKey)
            data =  json.dumps({"idToken": id_token,"password":user["password"],"returnSecureToken":True})
            request_object = requests.post(request_ref, headers=headers, data=data)
            request_object = request_object.json()
            
    except :
        return jsonify({"msg": "La contraseña debe de tener más de 6 caracteres"}), 400

    return jsonify([]), 200

@api.route("/signup", methods=["POST"])
def create_user():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    try: 
        user = auth.create_user(
        email=email,
        password=password,
        display_name=name)

    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify({"user_id": user.uid}), 200

@api.route("/prompts/<genre>", methods=["GET"])
def get_random_prompts(genre):

    ref = db.reference('public/writing-prompts')
    data = ref.order_by_child('genre').equal_to(genre).limit_to_last(30).get()

    prompts = []
    for key, val in data.items():
        prompts.append({'prompt_id': key, 'genre': val['genre'], 'prompt': val['prompt']})

    return jsonify(prompts), 200

@api.route("/add/favoriteprompts", methods=["POST"])
def add_favorite_prompt():
    prompt = request.json.get("prompt", None)
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    if prompt is None: 
        return jsonify({"msg": "Prompt does not exist"}),400
    try: 
        ref = db.reference("private/favorite-prompts")
        ref.child(user_id).child(prompt['prompt_id']).set({
            'genre': prompt['genre'],
            'prompt': prompt['prompt']
        })
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify([]), 200

@api.route("/delete/favoriteprompts", methods=["POST"])
def delete_favorite_prompt():
    prompt_id = request.json.get("prompt_id", None)

    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    if prompt_id is None: 
        return jsonify({"msg": "Something went wrong"}),400
    try: 
        ref = db.reference("private/favorite-prompts")
        prompt = ref.child(user_id).child(prompt_id).delete()
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify([]), 200

@api.route("/user/favoriteprompts", methods=["GET"])
def get_favorite_prompts():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    try: 
        ref = db.reference("private/favorite-prompts")
        data = ref.child(user_id).get()
        prompts = []
        for key, val in data.items():
            prompts.append({'prompt_id': key, 'genre': val['genre'], 'prompt': val['prompt']})
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(prompts), 200

@api.route("/randomcharacter", methods=["GET"])
def get_random_character():

    try: 
        array_length = db.reference("admin/object_length").get()
        names_length = array_length['names']
        last_names_length = array_length['last_names']
        occupations_length = array_length['occupations']
        p_type_length = array_length['personality_types']

        ref= db.reference("public")

        name = ref.child("names").order_by_key().start_at(str(randint(100, 100+names_length))).limit_to_first(1).get()
        last_name = ref.child("last_names").order_by_key().start_at(str(randint(100, 100+last_names_length))).limit_to_first(1).get()
        occupation = ref.child("occupations").order_by_key().start_at(str(randint(100, 100+occupations_length))).limit_to_first(1).get()
        p_type = ref.child("personality_types").order_by_key().start_at(str(randint(100, 100+p_type_length))).limit_to_first(1).get()
        
        character = {"name":list(name.values())[0]['name'], 
                "last_name": list(last_name.values())[0]['last_name'],
                "gender": list(name.values())[0]['gender'], 
                "occupation": list(occupation.values())[0]['occupation'], 
                "personality_name": list(p_type.values())[0]['type'], 
                "personality_desc": list(p_type.values())[0]['description'], 
                "age": randint(12, 99)}
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(character), 200

@api.route("/add/favoritecharacters", methods=["POST"])
def add_favorite_character():
    character = request.json.get("character", None)
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    
    user_id = cookie["user_id"]

    if character is None: 
        return jsonify({"msg": "Something went wrong"}),400
    try: 
        ref = db.reference("private/favorite-characters").child(user_id).push()
        key = ref.key
        ref.set(character)

    except: 
        return jsonify({"msg": "Chracter couldn't be added!"}),400

    return jsonify({"character_id": key}), 200

@api.route("/delete/favoritecharacters", methods=["POST"])
def delete_favorite_character():
    character_id = request.json.get("character_id", None)
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    if character_id is None: 
        return jsonify({"msg": "Character does not exist."}),400
    try: 
        ref = db.reference("private/favorite-characters")
        prompt = ref.child(user_id).child(character_id).delete()
    except: 
        return jsonify({"msg": "Character couldn't be removed!"}),400

    return jsonify([]), 200


@api.route("/user/favoritecharacters", methods=["GET"])
def get_favorite_characters():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    try: 
        ref = db.reference("private/favorite-characters")
        data = ref.child(user_id).get()
        characters = []
        for key, val in data.items():
            characters.append({"id": key, 
            "name":val["name"], 
             "last_name": val["last_name"],
             "gender": val["gender"].lower(), 
             "occupation": val["occupation"], 
             "personality_desc": val["personality_desc"], 
             "personality_name": val["personality_name"], 
             "age": val["age"]})
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(characters), 200


@api.route("/user/favoritecharacters/<character_id>", methods=["GET"])
def get_favorite_character_by_id(character_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    try: 
        ref = db.reference("private/favorite-characters")
        character = ref.child(user_id).child(character_id).get()
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(character), 200

@api.route("/create-character", methods=["POST"])
def create_character():
    character = request.json.get("character", None)
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    try: 
        ref = db.reference("private/custom-character")
        ref.child(user_id).push(character)
    except: 
        return jsonify({"msg": "There has been an error creating this character"}),400

    return jsonify({"msg": "Character created!"}), 200

@api.route("/update-character", methods=["PUT"])
def update_character():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    character = request.json.get("character", None)
    character_id = request.json.get("character_id", None)

    if character is None: 
        return jsonify({"msg": "Something went wrong"}),400

    try: 
        upload_character_name_in_plots(character_id, user_id, character["name"])
        ref = db.reference("private/custom-character")
        ref.child(user_id).child(character_id).set(character)
    except: 
        return jsonify({"msg": "Ups! There has been an error updating this character"}),400

    return jsonify({"msg": "Character updated!"}), 200

def upload_character_name_in_plots(character_id, user_id, new_name):
    current_character = db.reference("private/custom-character").child(user_id).child(character_id).get()
    if current_character["name"] != new_name:
        if "plots" in current_character:
            for plot_id, title in current_character["plots"].items():
                db.reference("private/plots").child(user_id).child(plot_id).child("characters").child(character_id).set(new_name)

@api.route("/user/characters", methods=["GET"])
def get_custom_characters():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        ref = db.reference("private/custom-character")
        data = ref.child(user_id).get()
        characters = []

        for key, val in data.items():
            val['id'] = key
            characters.append(val)

    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(characters), 200

@api.route("/user/name/custom-characters", methods=["GET"])
def get_name_custom_characters():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        ref = db.reference("private/custom-character")
        data = ref.child(user_id).get()
        characters = {}

        for key, val in data.items():
            characters[key] = val["name"]

    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(characters), 200

@api.route("/user/custom-characters/<character_id>", methods=["GET"])
def get_custom_character(character_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        ref = db.reference("private/custom-character").child(user_id)
        character = ref.child(character_id).get()
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(character), 200

@api.route("/user/custom-characters/delete/<character_id>", methods=["DELETE"])
def delete_custom_character(character_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        delete_character_from_plots(character_id, user_id)
        character = db.reference("private/custom-character").child(user_id).child(character_id).delete()
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(""), 200

def delete_character_from_plots(character_id, user_id):
    character = db.reference("private/custom-character").child(user_id).child(character_id).get()
    if "plots" in character: 
        for plot_id,name in character["plots"].items():
            ref = db.reference("private/plots").child(user_id).child(plot_id).child("characters").child(character_id).delete()    

@api.route("/user/add/plot/character", methods=["POST"])
def add_character_to_plot():
    character = request.json.get("character", None)
    plot = request.json.get("plot", None)
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    try: 
        ref = db.reference("private/custom-character").child(user_id).child(character["id"]).child("plots")
        ref.child(plot["id"]).set(plot["title"])
        ref = db.reference("private/plots").child(user_id).child(plot["id"]).child("characters")
        ref.child(character["id"]).set(character["name"])
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(""), 200

@api.route("/user/delete/plot/<plot_id>/character/<character_id>", methods=["DELETE"])
def delete_character_from_plot(plot_id, character_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    try: 
        ref = db.reference("private/custom-character").child(user_id).child(character_id).child("plots")
        ref.child(plot_id).delete()
        ref = db.reference("private/plots").child(user_id).child(plot_id).child("characters")
        ref.child(character_id).delete()
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(""), 200


@api.route("/create-plot", methods=["POST"])
def create_plot():
    plot = request.json.get("plot", None)

    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    try: 
        ref = db.reference("private/plots")
        ref.child(user_id).push(plot)
    except: 
        return jsonify({"msg": "There has been an error creating this plot"}),400

    return jsonify({"msg": "Plot created!"}), 200

@api.route("/user/plots", methods=["GET"])
def get_plots():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        ref = db.reference("private/plots")
        data = ref.child(user_id).get()
        plots = []

        for key, val in data.items():
            val['id'] = key
            plots.append(val)

    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(plots), 200

@api.route("/user/plots/<plot_id>", methods=["GET"])
def get_custom_plot(plot_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        ref = db.reference("private/plots").child(user_id)
        plot = ref.child(plot_id).get()
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(plot), 200

@api.route("/user/name/plots", methods=["GET"])
def get_name_plots():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        data = db.reference("private/plots").child(user_id).get()
        plots = {}

        for key, val in data.items():
            plots[key] = val["title"]

    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(plots), 200

@api.route("/update-plot", methods=["PUT"])
def update_plot():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    plot = request.json.get("plot", None)
    plot_id = request.json.get("plot_id", None)

    if plot is None: 
        return jsonify({"msg": "Something went wrong"}),400
    
    update_plot_title(plot_id, user_id, plot["title"])

    try: 
        update_plot_title(plot_id, user_id, plot["title"])
        ref = db.reference("private/plots")
        ref.child(user_id).child(plot_id).set(plot)
    except: 
        return jsonify({"msg": "Ups! There has been an error updating this character"}),400

    return jsonify({"msg": "Plot updated!"}), 200

def update_plot_title(plot_id, user_id, new_title):
    current_plot = db.reference("private/plots").child(user_id).child(plot_id).get()
    if current_plot["title"] != new_title:
        if "characters" in current_plot:
            for character_id, name in current_plot["characters"].items():
                db.reference("private/custom-character").child(user_id).child(character_id).child("plots").child(plot_id).set(new_title)
        if "societies" in current_plot:
            for society_id, name in current_plot["societies"].items():
                db.reference("private/societies").child(user_id).child(society_id).child("plots").child(plot_id).set(new_title)

@api.route("/user/plots/delete/<plot_id>", methods=["DELETE"])
def delete_plot(plot_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        plot = db.reference("private/plots").child(user_id).child(plot_id).get()
        if "characters" in plot:
            delete_plot_from_characters(plot_id, user_id, plot["characters"])
        if "societies" in plot:
            delete_plot_from_societies(plot_id, user_id, plot["societies"])
        plot = db.reference("private/plots").child(user_id).child(plot_id).delete()

    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(""), 200

def delete_plot_from_characters(plot_id, user_id, characters):
    for character_id, name in characters.items():
        ref = db.reference("private/characters").child(user_id).child(character_id).child("plots").child(plot_id).delete()


def delete_plot_from_societies(plot_id, user_id, societies):
    for society_id, name in societies.items():
        ref = db.reference("private/societies").child(user_id).child(society_id).child("plots").child(plot_id).delete()


@api.route("/user/add/plot/<plot_id>/event", methods=["POST"])
def add_event_to_plot(plot_id):
    event = request.json.get("event", None)

    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    try: 
        added = db.reference("private/events").child(user_id).child(plot_id).push(event)
        event_id = added.key
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify({"id": event_id}), 200

@api.route("/user/plots/<plot_id>/events", methods=["GET"])
def get_plot_events(plot_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        events_obj = db.reference("private/events").child(user_id).child(plot_id).order_by_child('date').get()
        if events_obj is not None: 
            events = []
            for id, event in events_obj.items():
                event["id"] = id
                events.append(event)
            # events.sort(key=lambda x:x['date'])

        else:
            return jsonify([]), 200

    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(events), 200

@api.route("/user/delete/plots/<plot_id>/event/<event_id>", methods=["DELETE"])
def delete_event(plot_id, event_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]


    try: 
        ref = db.reference("private/events")
        ref.child(user_id).child(plot_id).child(event_id).delete()
    except: 
        return jsonify({"msg": "Ups! There has been an error updating this"}),400

    return jsonify({"msg": "Event deleted!"}), 200

@api.route("/create-society", methods=["POST"])
def create_society():
    society = request.json.get("society", None)

    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    try: 
        db.reference("private/societies").child(user_id).push(society)
    except: 
        return jsonify({"msg": "There has been an error creating this society"}),400

    return jsonify({"msg": "Society created!"}), 200

@api.route("/user/societies", methods=["GET"])
def get_societies():
    cookie = confirm_access(request.headers.get('Authorization'))
    
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    
    user_id = cookie["user_id"]
    
    try: 
        data = db.reference("private/societies").child(user_id).get()
        societies = []

        for key, val in data.items():
            val['id'] = key
            societies.append(val)
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(societies), 200

@api.route("/user/name/societies", methods=["GET"])
def get_name_societies():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        data = db.reference("private/societies").child(user_id).get()
        societies = {}

        for key, val in data.items():
            societies[key] = val["name"]

    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(societies), 200

@api.route("/user/add/plot/society", methods=["POST"])
def add_society_to_plot():
    society = request.json.get("society", None)
    plot = request.json.get("plot", None)
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    db.reference("private/societies").child(user_id).child(society["id"]).child("plots").child(plot["id"]).set(plot["title"])
    db.reference("private/plots").child(user_id).child(plot["id"]).child("societies").child(society["id"]).set(society["name"])
    try: 
        db.reference("private/societies").child(user_id).child(society["id"]).child("plots").child(plot["id"]).set(plot["title"])
        db.reference("private/plots").child(user_id).child(plot["id"]).child("societies").child(society["id"]).set(society["name"])
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(""), 200

@api.route("/user/delete/plot/<plot_id>/society/<society_id>", methods=["DELETE"])
def delete_society_from_plot(plot_id, society_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    try: 
        soc = db.reference("private/societies").child(user_id).child(society_id).child("plots").child(plot_id).delete()
        plot = db.reference("private/plots").child(user_id).child(plot_id).child("societies").child(society_id).delete()
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(""), 200


@api.route("/update-society", methods=["PUT"])
def update_society():
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]

    society = request.json.get("society", None)
    society_id = request.json.get("society_id", None)
    
    try: 
        upload_society_name_in_plots(society_id, user_id, society["name"])
        ref = db.reference("private/societies")
        ref.child(user_id).child(society_id).set(society)
    except: 
        return jsonify({"msg": "Ups! There has been an error updating this society"}),400

    return jsonify({"msg": "Society updated!"}), 200

def upload_society_name_in_plots(society_id, user_id, new_name):
    current_society = db.reference("private/societies").child(user_id).child(society_id).get()
    if current_society["name"] != new_name:
        if "plots" in current_society:
            for plot_id, title in current_society["plots"].items():
                db.reference("private/plots").child(user_id).child(plot_id).child("societies").child(society_id).set(new_name)


@api.route("/user/societies/<society_id>", methods=["GET"])
def get_society(society_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        society = db.reference("private/societies").child(user_id).child(society_id).get()
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(society), 200

@api.route("/user/societies/delete/<society_id>", methods=["DELETE"])
def delete_society(society_id):
    cookie = confirm_access(request.headers.get('Authorization'))
    if cookie["code"] != 200:
        return jsonify({"msg": "Invalid session"}), 422
    user_id = cookie["user_id"]
    
    try: 
        delete_society_from_plots(society_id, user_id)
        db.reference("private/societies").child(user_id).child(society_id).delete()

    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify(""), 200

def delete_society_from_plots(society_id, user_id):
    society = db.reference("private/societies").child(user_id).child(society_id).get()
    if "plots" in society:
        for plot_id, name in society["plots"].items():
            ref = db.reference("private/plots").child(user_id).child(plot_id).child("societies").child(society_id).delete()