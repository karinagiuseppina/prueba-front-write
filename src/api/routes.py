from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from firebase import firebase
import firebase_admin
import pyrebase

firebaseConfig = {
  "apiKey": "AIzaSyCrj0v7MEfDYh1hYJY8oqMS5QtH9y3BCNU",
  "authDomain": "pruebas-dcda9.firebaseapp.com",
  "databaseURL": "https://pruebas-dcda9-default-rtdb.europe-west1.firebasedatabase.app",
  "projectId": "pruebas-dcda9",
  "storageBucket": "pruebas-dcda9.appspot.com",
  "messagingSenderId": "883550791745",
  "appId": "1:883550791745:web:a83969d3f572a0957efec0",
  "measurementId": "G-EF0W5BTRGL"
}
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
db = firebase.database()

api = Blueprint('api', __name__)


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    try:
        user = auth.sign_in_with_email_and_password(email, password)
    except:
        return jsonify({"msg": "Wrong email or password"}), 400

    return jsonify(user), 200


@api.route("/signup", methods=["POST"])
def create_user():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    username = request.json.get("username", None)

    try: 
        user = auth.create_user_with_email_and_password(email, password)
        user_id = user['localId']
        user_data = {
                "users/"+user_id: {
                                    "name": name, 
                                    "username": username, 
                                    "email": email
                                }
                }
        db.update(user_data)
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify({"user_id": user_id}), 200

@api.route("/prompts/<genre>", methods=["GET"])
def get_random_prompts(genre):
    ref = db.reference('writing-prompts')
    print(ref.get())
    prompts_array = []
    for prompt in prompts:
        prompts_array.append(prompt.to_dict())

    return jsonify(prompts_array), 200

@api.route("/hello", methods=["GET"])
def say_hello():
    #GET de todos separando clave valor
    all_users = db.child("users").get()
    users = {}
    for user in all_users.each():
        users[user.key()] = user.val()
    return jsonify(users), 200