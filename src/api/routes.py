from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import firebase_admin
from firebase_admin import credentials, firestore

firebaseCredentials = {
  "type": "service_account",
  "project_id": "pruebas-dcda9",
  "private_key_id": "b12dafae8be5715382dbaf471cb22a8e4d639df1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCO3gHB0YlsKlBv\nZSSUsmY96tovqZWISsNyLu66CCCYn8Zzn8Dx6zGA6rWnOABAEvEv6jklYrwO/nFR\nf3LHUwH3BHrfd9CpdUQAaqqKup0qkoh58Fkp8GJPmWySvGklRlm2bis1SCQLzatf\n1RM1PACwkPWOxIMA4MjL9vpiZHtU7c2tQgL+fDSbPXr2fLUwBBG9kK4KHUCpZrGS\noIXBFcwqicC621yuD3LvRuUMB3LFdgQ7r3dhvjbSVVKTbPqm1A/Y0ow2kTpH3Zj9\njiDkJF6pEPjtzr7LzgIZVVWlIvYSGqlJWnayMnJm/YjXwfyn7Q/880L5U498Pd10\nRzEf3Y7XAgMBAAECggEAO2JKZq7bKUu5XWQ0PV6eIvSAtrkNv7Yb4VViw47nRal8\nCsmHoMb7L7Pfx97+M6Pr/tej40dUFgNrRM3t/q4hLfT9we+Cmz10A5xSwRFqjKyV\n7+GYnlcd9io2uBN6vRSt66eFbENNQF6/8jiWIFWNj9bhSvOh5HaK4EULtGRB433K\nB5yAnGTqbNOanBXiLT+15cBYNFBxAMQUL9/Bs/lImPjMEfEdOajVdxCIKtTDf43b\nptw+Y7Dw5/2tNe7gzEMUjIH1yexEf1P9gAKN4NXemJwlKfJTX+ham7rWETFmKBjf\n05NacgDuAJACMxubamyne+IM1HtatOL3ihfdwMtz4QKBgQDI4mMWJHs8UVaudxDw\nh4971Q0fcdOr2t/LSnj3bLq70rx+7QiBgUfj3jXj2KYu/KV808gEUe6JHz5zB9wq\nJ9ifk8TS6WCyYdTAQj1DmX9OXWoGc+DrgtiNhaNrZXiptDOvzBLtqUVlVtMtSGwu\nurCjSb5yE1kwunUouwphakBWJwKBgQC2EKSaA0EZzY1gZmsxRjRe0xgwmnFbu7GC\nOd7l0HXl5EEtEOIY9PUNLIuHRdjMlRFq285AjN8TWDpWfofGxxAbC/oqJiRbZTUq\n1EGwN4+FMngQjqCXxI7/dpiItfLMKPvsKzL5IEaGiCnOMNNJHpnY1UlQm1JeE/zl\nbkdKh6Of0QKBgD2/oPegdSUgV4W/Ybyd3tQQtDzzLz6HQ/1oQfDEQk4TxA876z5r\nr95yYpxL7yFIVdIeA0CYsrsBmJ+hTeLDZsn+kSTHygprGguTEOPjngdHnZyoJ/4c\ntVYjOw17HnEDzFOAZl0ZiBRTcQxdU6u1hTBcLadBHUxmNDc170XsdCRHAoGBAKW6\n5qsPtU4Qr9YFxSPYfUmoLMfpfrD7XS1nEoDuTrQTIEUurjH7oan5V5WuvhgUxgMY\nzVozIclRMeGUUnJeuEl2kKWXjNbpfQlcp+MJ4IpmE6c2vfcJRQZE5brkrXys/g3Q\nkRj4CVrjTfLUvTA9O9yG4rMOgF8FINuUlC7C4+5RAoGAatdeY2aGxngwtOaaWneY\np0/r94L0CbfY99HyyKeavd6Oie4evmW0h3EIZecqizeEI/TgVakVaQkMKubJ9/Jv\nIcbr80FBK1EorxNjxBm4fK0CbpAqqw7fra/oxP27GGEvsA4+4jEEjfnSTFJ1yAho\nmkMulHsWgMIKJUG8nIj7rXA=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-j3v4b@pruebas-dcda9.iam.gserviceaccount.com",
  "client_id": "102912967911479494034",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j3v4b%40pruebas-dcda9.iam.gserviceaccount.com"
}

firebaseConfig = credentials.Certificate(firebaseCredentials)

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