import re
import sys
import json
import requests
from oouch import app, db
from oouch.models import User, Token
from flask_login import current_user, login_user, logout_user, login_required
from flask import render_template,redirect, url_for, flash, request
from oouch.forms import LoginForm, RegistrationForm, PasswordChangeForm, ContactForm
from werkzeug.urls import url_parse
sys.path.insert(0, "/usr/lib/python3/dist-packages")
import dbus

regex = re.compile("((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)")
primitive_xss = re.compile("(<script|<img|<svg|onload|onclick|onhover|onerror|<iframe|<html|alert|document\.)")

CLIENT_ID = 'UDBtC8HhZI18nJ53kJVJpXp4IIffRhKEXZ0fSd82'
CLIENT_SECRET = 'TWy69ksk8kSYZ25ZySDS8zVIeKnxMRcnL4NyE6Xzl15K2Q31JrzaWErqbI83V8ZOfRZ2wLKewQqZCgpZn9MJoYacaBBRNEdTENtkh0vPj3EUx5xU2FgusaUpc0Kn41xY'


####################
# Hepler Functions #
####################

def authorization_redirect(url):
    '''
    Redirects the user to the authorization server and uses the parameter {url} to determine the redirect url.

    Parameters:
        url                 (String)                Redirect url for the authorization server.

    Returns:
        redirect            (Redirect)              Redirect to the authorization server
    '''
    return redirect(f'http://authorization.oouch.htb:8000/oauth/authorize/?client_id={CLIENT_ID}&response_type=code&redirect_uri={url}&scope=read')


def get_oouch_user(code, url):
    '''
    Takes an authorization_code and the corresponding redirect_url and fetches the associated user information.

    Parameters:
        code                (String)                Redirect url for the authorization server.
        url                 (String)                Redirect url for the authorization server.

    Returns:
        username            (String)                Username of the corresponding oouch user
    '''
    # First we check if the code is really valid and not None
    if not code:
        raise Exception('No authorization code found')

    # If the code is there, we start to build the post parameters for the access_token_request
    data =  {  
                "client_id" : CLIENT_ID,
                "client_secret" : CLIENT_SECRET,
                "grant_type" : "authorization_code",
                "code": code,
                "redirect_uri": url,
            }

    # Finally we try to obtain the access token by requesting the authorization server
    r = requests.post("http://authorization.oouch.htb:8000/oauth/token/", data=data)
    try:
        json_data = json.loads(r.text)
        access_token = json_data["access_token"]
    except:
        raise Exception('Failed to obtain access token')

    # If the execution reaches this code, we have obtained an access token and can theoretically fetch user data
    headers = { "Authorization" : f'Bearer {access_token}' }
    r = requests.get("http://authorization.oouch.htb:8000/api/get_user", headers=headers)
    try:
        json_data = json.loads(r.text)
        username = json_data["username"]
    except:
        raise Exception('Failed to obtain user_details')

    # And if execution comes down to here, we should have a valid username and return it as the result
    return username



####################
#   Actual Routes  #
####################

@app.route('/login', methods=['GET', 'POST'])
def login():
    '''
    Performs a user login. Searches the database for the desired username and compares the password hash for the corresponding user.

    Parameters:
        None

    Returns:
        redirect                (Redirect)              Either a redirct to the /login page (login failed) or the /home page (success).
    '''
    # If the current user is authenticated, we redirect him to the /home page
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    # Otherwise we will look at the form
    form = LoginForm()
    if form.validate_on_submit():

        # Check if user is contained inside the database and if his password is correct
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            return redirect(url_for('login'))

        # Redirect the user to the /home page or to the value of the next parameter 
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('home')
        return redirect(next_page)

    # If the form was invalid, redirect him back to /login
    return render_template('login.html', titel='login', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    '''
    Register a new user account.

    Parameters:
        None

    Returns:
        redirect                (Redirect)              Either a redirect to the /login page (success) or back to the registration form (failure).
    '''
    # If the current user is authenticated, we redirect him back to /home
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    # Otherwise we look at the form
    form = RegistrationForm()
    if form.validate_on_submit():

        # We just create a new user object. If the user does already exist, the modle validator will intercept here
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash(f'Registration Successful! Welcome {form.username.data}!')
        return redirect(url_for('login'))

    # If the form was invalid, redirect the user back to /register
    return render_template('register.html', title='Register', form=form)


@app.route('/profile', methods=['GET'])
@login_required
def profile():
    '''
    Renders the users profile page. The profile page contains only some user information and the Oouch connected user accounts.

    Parameters:
        None

    Returns:
        render                 (Render)                 The rendered profile page
    '''
    # For the current_user, we fetch all connected users from the database
    connected_users = Token.query.filter_by(user_id=current_user.id).all()

    # If no users are connected, we create a dummy connected user with the error message as name
    if not connected_users:
        dummy = Token(oouch_username="No Accounts Connected")
        connected_users = [dummy]

    # When we pass the list of connected users to the template
    return render_template('profile.html', title='Profile', connected_users=connected_users)


@app.route('/password_change', methods=['GET', 'POST'])
@login_required
def password_change():
    '''
    Changes the password of the current user.

    Parameters:
        None

    Returns:
        redirect               (Redirect)               Either a redirect to /home (success) or back to /password_change (failure)
    '''
    # The password change side can only be visited by authenticated users. No need to check is_authenticated
    form = PasswordChangeForm()
    if form.validate_on_submit():

        # For the current user, we check if the old password matches the new one
        user = current_user
        if user is None or not user.check_password(form.opassword.data):
            flash(f'Old password is wrong!')
            return redirect(url_for('password_change'))

        # If the old password matches, we update to the new one
        user.set_password(form.npassword.data)
        db.session.commit()
        flash(f'Password was changed successfully')
        return redirect(url_for('home'))

    # If something goes wron, we redirect back to the password change side
    return render_template('password_change.html', title='Password Change', form=form)



@app.route('/documents')
@login_required
def documents():
    '''
    The documents endpoint is a pure fake. For ordinary users it does nothing. For the user qtc it shows some sensitive data, 
    that is required to proceed with the box. However, there is no real functionality to fetch or update the data and it is only
    static coded inside of the template.

    Parameters:
        None

    Returns:
        render                (Render)                  Renders the documents page.
    '''
    user = current_user

    # If the current user is 'qtc', we render the special documents page containing sensitive information
    if user.username == "qtc":
        return render_template('qtc_documents.html', title='Documents')
    
    # Otherwise the dummy documents page gets rendered
    return render_template('documents.html', title='Documents')


@app.route('/about')
@login_required
def about():
    '''
    A simple about endpoint. Just contains some useles text.

    Parameters:
        None

    Returns:
        render                (Render)                  Renders the about page.
    '''
    return render_template('about.html', title='About')


@app.route('/contact', methods=['GET', 'POST'])
@login_required
def contact():
    '''
    The contact page is required to abuse the Oauth vulnerabilities. This endpoint allows the user to send messages using a textfield.
    The messages are scanned for valid url's and these urls are saved to a file on disk. A cronjob will view the files regulary and
    invoke requests on the corresponding urls.

    Parameters:
        None

    Returns:
        render                (Render)                  Renders the contact page.
    '''
    # First we need to load the contact form
    form = ContactForm()

    # If the form was already submitted, we process the contents
    if form.validate_on_submit():

        # First apply our primitive xss filter
        if primitive_xss.search(form.textfield.data):
            bus = dbus.SystemBus()
            block_object = bus.get_object('htb.oouch.Block', '/htb/oouch/Block')
            block_iface = dbus.Interface(block_object, dbus_interface='htb.oouch.Block')

            client_ip = request.environ.get('REMOTE_ADDR', request.remote_addr)  
            response = block_iface.Block(client_ip)
            bus.close()
            return render_template('hacker.html', title='Hacker')

        # The regex defined at the beginning of this file checks for valid urls
        url = regex.search(form.textfield.data)
        if url:

            # If an url was found, we try to save it to the file /code/urls.txt
            try:
                with open("/code/urls.txt", "a") as url_file:
                    print(url.group(0), file=url_file)
            except:
                print("Error while openeing 'urls.txt'")

        # In any case, we inform the user that has message has been sent
        return render_template('contact.html', title='Contact', send=True, form=form)

    # Except the functions goes up to here. In this case, no form was submitted and we do not need to inform the user
    return render_template('contact.html', title='Contact', send=False, form=form)


@app.route('/logout')
def logout():
    '''
    Just an ordinary logout function.

    Parameters:
        None

    Returns:
        redirect               (Redirect)                  A redirect to the login page.
    '''
    logout_user()
    return redirect(url_for('login'))


@app.route('/')
@app.route('/home')
@login_required
def home():
    '''
    Just renders the /home template.

    Parameters:
        None

    Returns:
        Render                (Render)                      Renders the /home page.
    '''
    return render_template('home.html', titel='home')


@app.route('/oauth', methods=['GET'])
@login_required
def oauth():
    '''
    Hidden oauth endpoint. Simply exmplains that this application does also support login using oauth2.

    Parameters:
        None

    Returns:
        render                (Render)                  Renders the oauth page.
    '''
    return render_template('oauth.html', title='OAuth')


@app.route('/oauth/connect', methods=['GET'])
@login_required
def oauth_connect():
    '''
    Initiates the connection process to the current user account. This is simply a redirect to the authorization server
    containing the corresponding redirect url.

    Parameters:
        None

    Returns:
        redirect              (Redirect)                  Redirect to the authorization server.
    '''
    return authorization_redirect('http://consumer.oouch.htb:5000/oauth/connect/token')


@app.route('/oauth/connect/token', methods=['GET'])
@login_required
def oauth_connect_token():
    '''
    This function connects an account on the oouch authorization server with a user account on the consumer. It has to be called
    by the authroization server with a valid authorization code.

    Parameters:
        None

    Returns:
        redirect              (Redirect)                  Redirect either to an error page (failed) or to the users profile (success).
    '''
    # First we obtain the authorization code from the request
    code = request.args.get('code')

    # When we try to obtain the name of the user the token is belonging to
    try:
        username = get_oouch_user(code, 'http://consumer.oouch.htb:5000/oauth/connect/token')
    except Exception as e:
        return render_template('error.html', title='Error', code=str(e))

    # If execution reaches this point, we got a valid user and look if he is already connected to an account
    connected_user = Token.query.filter_by(oouch_username=username).first()

    # If the user is not already connected, we connect him to the current user
    if connected_user is None:
        connected_user = Token(oouch_username=username, user_id=current_user.id)
        db.session.add(connected_user)

    # If the user is already connected, we change his connection relationship to the current user
    else:
        connected_user.user_id = current_user.id

    # Finally we comit all changes and redirect back to the users profile
    db.session.commit()
    return redirect(url_for('profile'))


@app.route('/oauth/login', methods=['GET'])
def oauth_login():
    '''
    Initiates the connection process to the current user account. This is simply a redirect to the authorization server
    containing the corresponding redirect url.

    Parameters:
        None

    Returns:
        redirect              (Redirect)                  Redirect to the authorization server.
    '''
    return authorization_redirect('http://consumer.oouch.htb:5000/oauth/login/token')


@app.route('/oauth/login/token', methods=['GET'])
def oauth_login_token():
    '''
    This function allows users to sign in using their oouch account. It has to be called by the authorization server with a valid 
    authorization_code.

    Parameters:
        None

    Returns:
        redirect              (Redirect)                  Redirect either to an error page (failed) or to the users /home page (success).
    '''
    # First we obtain the authorization code from the request
    code = request.args.get('code')

    # When we try to obtain the name of the user the token is belonging to
    try:
        username = get_oouch_user(code, 'http://consumer.oouch.htb:5000/oauth/login/token')
    except Exception as e:
        return render_template('error.html', title='Error', code=str(e))

    # At this point we should have a valid username on the oouch endpoint and check if it is connected to a local user account
    connected_user = Token.query.filter_by(oouch_username=username).first()

    # If it is not connected, we redirect to the error page
    if connected_user is None:
        return render_template('error.html', title='Error', code='No connected users for this oouch account')

    # If it is connected, we search for the corresponding connected user. If it does not exist, we throw an error
    user = User.query.filter_by(id=connected_user.user_id).first()
    if user is None:
        return render_template('error.html', title='Error', code='Unexpected Error')

    # When we find the connected local user, we log him in and redirect him to his /home page
    login_user(user)
    return redirect(url_for("home"))


@app.route('/oauth/disconnect', methods=['GET'])
def oauth_disconnect():
    '''
    Some users might want to disconnect their oouch account from a local user. This endpoint handles this action.

    Parameters:
        None

    Returns:
        redirect              (Redirect)                  Redirect to the authorization server.
    '''
    return authorization_redirect('http://consumer.oouch.htb:5000/oauth/disconnect/token')


@app.route('/oauth/disconnect/token', methods=['GET'])
def oauth_disconnect_token():
    '''
    This function handles an account disconnect. It takes a valid authorization_code and removes the corresponding oouch user
    from the corresponding database table. After it finished, the oouch user should not be able to login any longer..

    Parameters:
        None

    Returns:
        redirect              (Redirect)                  Redirect either to an error page (failed) or to the users /home page (success).
    '''
    # First we obtain the authorization code from the request
    code = request.args.get('code')

    # When we try to obtain the name of the user the token is belonging to
    try:
        username = get_oouch_user(code, 'http://consumer.oouch.htb:5000/oauth/disconnect/token')
    except Exception as e:
        return render_template('error.html', title='Error', code=str(e))

    # At this point we found the oouch username and can check if it has connected user accounts
    connected_user = Token.query.filter_by(oouch_username=username).first()

    # If no local accounts are connected, we redirect to the error page
    if connected_user is None:
        return render_template('error.html', title='Error', code='No connected users for this oouch account')

    # If local accounts are connected, we delete the corresponding connections from the database
    db.session.delete(connected_user)
    db.session.commit()

    # Finally, we redirect the user to his profile, where he can see the current connected accounts.
    return redirect(url_for('profile'))



