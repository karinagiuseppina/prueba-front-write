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

apiKey = "AIzaSyDi7UUdcDjl0nVjA4ZEbR-gn4zAWePaL2w"
cred = credentials.Certificate('/workspace/prueba-front-write/firebase-key.json')
firebaseDatabase = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://write-me-in-default-rtdb.firebaseio.com/'
})

api = Blueprint('api', __name__)


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    request_ref = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={}".format(apiKey)
    headers = {"content-type": "application/json"}
    data =  json.dumps({"email": email, "password": password, "returnSecureToken": True})
    request_object = requests.post(request_ref, headers=headers, data=data)

    return jsonify(request_object.json()), 200

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

        ref = db.reference("private/users")
        ref.child(user.uid).set({
            "name": name,
            "email": email
        })
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify({"user_id": user.uid}), 200

@api.route("/prompts/<genre>", methods=["GET"])
def get_random_prompts(genre):

    ref = db.reference('public/writing-prompts')
    data = ref.order_by_child('genre').equal_to(genre).limit_to_last(10).get()

    prompts = []
    for key, val in data.items():
        prompts.append({'prompt_id': key, 'genre': val['genre'], 'prompt': val['prompt']})

    return jsonify(prompts), 200

@api.route("/add/favoriteprompts", methods=["POST"])
def add_favorite_prompt():
    prompt = request.json.get("prompt", None)
    user_id = request.json.get("user_id", None)
    if prompt is None or user_id is None: 
        return jsonify({"msg": "Something went wrong"}),400
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
    user_id = request.json.get("user_id", None)
    if prompt_id is None or user_id is None: 
        return jsonify({"msg": "Something went wrong"}),400
    try: 
        ref = db.reference("private/favorite-prompts")
        prompt = ref.child(user_id).child(prompt_id).delete()
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify([]), 200

@api.route("/user/<user_id>/favoriteprompts", methods=["GET"])
def get_favorite_prompts(user_id):

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
    user_id = request.json.get("user_id", None)

    if character is None or user_id is None: 
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
    user_id = request.json.get("user_id", None)
    if character_id is None or user_id is None: 
        return jsonify({"msg": "Something went wrong"}),400
    try: 
        ref = db.reference("private/favorite-characters")
        prompt = ref.child(user_id).child(character_id).delete()
    except: 
        return jsonify({"msg": "Character couldn't be removed!"}),400

    return jsonify([]), 200


@api.route("/user/<user_id>/favoritecharacters", methods=["GET"])
def get_favorite_characters(user_id):

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