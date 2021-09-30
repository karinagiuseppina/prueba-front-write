from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin import auth

firebaseConfig = credentials.Certificate("/workspace/prueba-front-write/src/api/firestore-key.json")

firebase = firebase_admin.initialize_app(firebaseConfig)

db = firestore.client()

api = Blueprint('api', __name__)


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    return jsonify(user), 200


@api.route("/signup", methods=["POST"])
def create_user():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    image = request.json.get("profile_image", None)

    try: 
        user = auth.create_user(
        email=email,
        email_verified=False,
        password=password,
        display_name=name,
        photo_url=image,
        disabled=False)

    except: 
        return jsonify({"msg": "Sorry! Something went wrong"}), 400

    return jsonify({"user_id": user.uid}), 200

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