from datetime import datetime, timedelta
from flask import Blueprint, request
from flask_sse import sse

from businesslogic import generate_uuid
from extensions import db
from models import Clipboard


clip = Blueprint('clip', __name__)


@clip.route('/create', methods=['POST'])
def create():
    uuid = generate_uuid()
    text = ""
    delta = timedelta(days=2)
    expire = datetime.today() + delta

    clip = Clipboard(uuid=uuid, text=text, expire=expire)

    # save clip
    db.session.add(clip)
    db.session.commit()

    return {
        "uuid": uuid,
        "text": text
    }

@clip.route('/save', methods=['POST'])
def save():
    # get uuid
    json_data = request.get_json()
    uuid = json_data["clipboard"]["uuid"]

    # fetch clip instance
    clip = Clipboard.query.filter(Clipboard.uuid==uuid).first()
    clip.text = json_data["clipboard"]["text"]

    # save clip
    db.session.add(clip)
    db.session.commit()

    return json_data

@clip.route('/fetch/<string:suuid>')
def fetch(suuid):
    # fetch clip instance
    clip = Clipboard.query.filter(Clipboard.uuid==suuid).first()

    return {
        "uuid": clip.uuid,
        "text": clip.text
    }

@clip.route('/fetch', methods=['POST'])
def fetch_post():
    # get uuid
    json_data = request.get_json()
    uuid = json_data["uuid"]
    
    return fetch(uuid)

@clip.route('/delete', methods=['POST'])
def delete():
    # get uuid
    json_data = request.get_json()
    uuid = json_data["uuid"]

    # fetch clip instance
    clip = Clipboard.query.filter(Clipboard.uuid==uuid).first()
    
    # delete clip
    db.session.delete(clip)
    db.session.commit()

    return json_data
