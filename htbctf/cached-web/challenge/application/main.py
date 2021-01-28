from flask import Flask, session, jsonify, g
from application.blueprints.routes import web, api
from application.database.db import get_db

class Synack(Flask):
    def process_response(self, response):
        response.headers['Server'] = 'HTB x UNI CTF'
        super(self.__class__, self).process_response(response)
        return response

app = Synack(__name__)
app.config.from_object('application.config.Config')

app.register_blueprint(web, url_prefix='/')
app.register_blueprint(api, url_prefix='/api')

@app.before_first_request
def init_db():
    with app.open_resource(app.config['SCHEMA'], mode='r') as f:
        get_db().cursor().executescript(f.read())

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None: db.close()

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not Found'}), 404

@app.errorhandler(403)
def forbidden(error):
    return jsonify({'error': 'Not Allowed'}), 403

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad Request'}), 400