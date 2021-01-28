from Crypto.Cipher import AES
from flask import Flask, request, render_template, session
from flask_csp.csp import csp_header
import sqlite3
from hashlib import sha256
import markdown2
from selenium import webdriver
from socket import gethostbyname
from urlparse import urlparse

IP = "76.74.170.201"
BLOCK_SIZE = 32
pad = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)
key = "REDACTED"

assert len(key) == 32, "Key length error"

aes = AES.new(key, AES.MODE_ECB)
app = Flask(__name__)
app.secret_key = "REDACTED"
conn = sqlite3.connect('./user.db', check_same_thread=False)
c = conn.cursor()

def xor(msg1, msg2):
    res = ''
    for i in range(BLOCK_SIZE):
        res += chr(ord(msg1[i]) ^ ord(msg2[i]))
    return res

def encrypt(plaintext):
    plaintext = pad(plaintext)
    iv = pad("")
    ciphertext = ""
    for i in range(0, len(plaintext), BLOCK_SIZE):
        iv = xor(aes.encrypt(plaintext[i:i+BLOCK_SIZE]),iv)
        ciphertext += iv
    return ciphertext.encode('hex')

def decrypt(ciphertext):
    # REDACTED
    # res will be the plaintext
    return res

@app.route('/')
def index():
    return "Welcome To my Web + Crypto Task!"

@app.route('/api/login', methods=['POST'])
def login():
    try:
        user = request.form['id']
        pw = sha256(request.form['pw']).hexdigest()
        c.execute("select username from users where username=? and pw=?", (user, pw))
        res = c.fetchone()
        session['mycode'] = encrypt(res[0]+key)
        return 'Done!'
    except:
        return "Error!"

@app.route('/api/logout')
def logout():
    session.pop('mycode')
    return 'done!'

@app.route('/api/register', methods=['POST'])
def register():
    try:
        user = request.form['id']
        pw = sha256(request.form['pw']).hexdigest()
        c.execute("INSERT INTO users(username, pw) VALUES (?,?)",(user, pw))
        conn.commit()
        return 'register done!'
    except:
        return "Error!"

@app.route('/myinfo')
def info():
    if 'mycode' in session:
        return session['mycode']
    else:
        return 'Plz Login'

@app.route('/ticket')
@csp_header({
    "default-src": "'self'",
    "script-src":"'self' 'unsafe-inline'",
    "style-src": "'self'",
    "font-src": "'self'",
    "img-src": "'self'"})
def view_post():
    try:
        enc = request.args.get("msg")
        res_key = request.args.get("key")
        if res_key == key and request.remote_addr != '127.0.0.1':
            res = decrypt(enc)
            return markdown2.markdown(res,safe_mode=True)
        else:
            return "Key or Permission Error!"
    except:
        return "Something is wrong!"

@app.route('/flag')
def flag():
    if request.remote_addr == "127.0.0.1":
        return render_template("flag.html")
    else:
        return 'Only Admin can access!'

@app.route('/submit')
def submit():
    url = request.args.get("url")
    try:
        host = urlparse(url).netloc
        try:
            host = host[:host.index(':')]
        except:
            pass
        if gethostbyname(host) == IP:
            options = webdriver.ChromeOptions()
            options.add_argument('--headless')
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            driver = webdriver.Chrome(chrome_options=options, executable_path='/usr/local/bin/chromedriver')
            driver.implicitly_wait(30)
            driver.get(url)
            driver.quit()
            return "Done"
        else:
            return "Nop"
    except:
        return "URL Error"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
