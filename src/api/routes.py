from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
from firebase import firebase
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

@api.route('/hello', methods=['GET'])
def handle_hello():
    all_users = db.child("users").child("Morty").child("name").get()

    response_body = {
        "message": all_users.val()
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        user_id = auth.get_account_info(login['idToken']['users'][0]['localId']
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

    return 200

@api.route("/users", methods=["GET"])
def get_users():

    users = User.query.all()

    users = list(map(lambda user : user.serialize(), users))

    return jsonify(users), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    
    return jsonify({"id": user.id, "name": user.name,"email": user.email}), 200