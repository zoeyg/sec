from oouch import db
from oouch import login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username) 

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    oouch_username = db.Column(db.String(120), index=True, unique=True)
    user_id = db.Column(db.Integer, index=True)

    def __repr__(self):
        return f'<{self.oouch_username} ->  {self.user_id}>' 


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
