from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        return jsonify({"msg": "Ups! Wrong email or password. Try again!"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user": user.serialize()})

@api.route("/signup", methods=["POST"])
def create_user():
    username = request.json.get("username", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", None)

    # Query your database for username and password
    if email is None or password is None or username is None:
        return jsonify({"msg": "Sorry! An email, username and password are required. "}), 401
    
    user = User.query.filter_by(username=username).first()
    if user is not None: 
        return jsonify({"msg": "Sorry! The Username is already taken."}), 403

    user = User.query.filter_by(email=email).first()
    if user is not None: 
        return jsonify({"msg": "Sorry! The email is already taken."}), 403

    user = User(username=username, name=name, email=email, password = password, is_active= is_active)

    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize()), 200

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