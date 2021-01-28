from oouch.models import User
from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, PasswordField, BooleanField, SubmitField, TextField
from wtforms.validators import DataRequired, EqualTo, ValidationError, Email

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    cpassword = PasswordField('Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')

class PasswordChangeForm(FlaskForm):
    opassword = PasswordField('Old Password', validators=[DataRequired()])
    npassword = PasswordField('New Password', validators=[DataRequired()])
    cpassword = PasswordField('Repeat Password', validators=[DataRequired(), EqualTo('npassword')])
    submit = SubmitField('Change Password')

    def validate_opassword(self, opassword):
        user = current_user
        if not user.check_password(opassword.data):
            raise ValidationError('Old password is not correct')

class ContactForm(FlaskForm):
    textfield = TextField('Message', validators=[DataRequired()])
    submit = SubmitField('Send')
