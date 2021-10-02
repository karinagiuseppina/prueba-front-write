from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import firebase_admin
from firebase_admin import credentials, db, auth
import requests
from requests import Session
from requests.exceptions import HTTPError
import json

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

    try:
        request_ref = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={}".format(apiKey)
        headers = {"content-type": "application/json"}
        data =  json.dumps({"email": email, "password": password, "returnSecureToken": True})
        request_object = requests.post(request_ref, headers=headers, data=data)
    except:
        return jsonify({"msg": "Wrong email or password"}), 400

    return jsonify(request_object.json()), 200


@api.route("/signup", methods=["POST"])
def create_user():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    username = request.json.get("username", None)

    try: 
        user = auth.create_user(
        email=email,
        password=password,
        display_name=name)

        ref = db.reference("private/users")
        ref.child(user.uid).set({
            "username": username,
            "name": name,
            "email": email
        })
    except: 
        return jsonify({"msg": "Something went wrong"}),400

    return jsonify({"user_id": user.uid}), 200

@api.route("/prompts/<genre>", methods=["GET"])
def get_random_prompts(genre):
    ref = db.reference('public/writing-prompts')
    data = ref.order_by_child('genre').equal_to('fantasy').limit_to_last(5).get()
    prompts = []
    for key, val in data.items():
        prompts.append({'prompt_id': key, 'genre': val['genre'], 'prompt': val['prompt']})

    return jsonify(prompts), 200