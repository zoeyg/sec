#!/usr/bin/env python3

from flask import (
    Flask,
    render_template,
    request,
    abort,
    redirect,
    make_response,
    g,
    jsonify,
)
import binascii
import hashlib
import json

app = Flask(__name__)
app.secret_key = "secret_key"
FLAG = "flag.txt"


def do_login(user, password, admin):

    cookie = {"user": user, "password": password, "admin": admin}
    cookie["digest"] = hashlib.sha512(app.secret_key.encode() + bytes(json.dumps(cookie, sort_keys=True), "ascii")).hexdigest()

    response = make_response(redirect("/"))
    response.set_cookie("auth", binascii.hexlify(json.dumps(cookie).encode("utf8")))
    print(binascii.hexlify(json.dumps(cookie).encode("utf8")))

    return response


@app.route("/login", methods=["POST"])
def login():

    user = request.form.get("user", "")
    password = request.form.get("password", "")

    if (
        user != "hacker"
        or hashlib.sha512(bytes(password, "ascii")).digest()
        != b"hackshackshackshackshackshackshackshackshackshackshackshackshack"
    ):
        return abort(403)
    return do_login(user, password, True)


def load_cookie():

    cookie = {}
    auth = request.cookies.get("auth")
    print(request.cookies)
    print(auth)
    if auth:

        try:
            cookie = json.loads(binascii.unhexlify(auth).decode("utf8"))
            digest = cookie.pop("digest")

            if (
                digest
                != hashlib.sha512(
                    app.secret_key + bytes(json.dumps(cookie, sort_keys=True), "ascii")
                ).hexdigest()
            ):
                return False, {}
        except:
            print("exception")
            pass

    print("pass?")
    return True, cookie


@app.route("/logout", methods=["GET"])
def logout():

    response = make_response(redirect("/"))
    response.set_cookie("auth", "", expires=0)
    return response


@app.route("/")
def index():

    do_login("user","password",True)

    ok, cookie = load_cookie()
    if not ok:
        return abort(403)

    return jsonify("Hello")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=1337)