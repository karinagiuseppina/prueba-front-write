from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import firebase_admin
from firebase_admin import credentials, firestore

firebaseConfig = credentials.Certificate("/workspace/prueba-front-write/src/api/firestore-key.json")

firebase = firebase_admin.initialize_app(firebaseConfig)

db = firestore.client()

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
    username = request.json.get("username", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    try: 
        user = auth.create_user_with_email_and_password(email, password)
        user_id = user['localId']
        data = {
                "users/"+user_id: {
                                    "name": name, 
                                    "username": username
                                }
                }
        db.update(data)
    except: 
        return jsonify({"msg": "Sorry! Something went wrong"}), 400

    return jsonify({"user_id": user_id}), 200

@api.route("/prompts/<genre>", methods=["GET"])
def get_random_prompts(genre):
    prompts = db.collection('writing-prompts').where('genre', '==', genre).limit(5)
    prompts = prompts.stream()
    prompts_array = []
    for prompt in prompts:
        prompts_array.append(prompt.to_dict())

    return jsonify(prompts_array), 200

@api.route("/hello", methods=["GET"])
def say_hello():
    return jsonify({'msg': 'hello world'}), 200