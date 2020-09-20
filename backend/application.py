
from flask import Flask, request
from flask_cors import CORS

from blueprints import clip
from extensions import cors, db

app = Flask(__name__)
app.config.from_object('config')


# load extensions
cors.init_app(app)
db.init_app(app)


# register blueprint's
app.register_blueprint(clip, url_prefix='/clip')


@app.route('/')
def hello():
    return 'Hello World, clipboard project!'

