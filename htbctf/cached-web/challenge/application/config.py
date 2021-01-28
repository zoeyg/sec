from application.util import generate
from os import getcwd

class Config(object):
    SECRET_KEY = generate(50)
    DATABASE = getcwd() + '/application/database/db/database.db'
    SCHEMA = getcwd() + '/application/database/schema.sql'

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True