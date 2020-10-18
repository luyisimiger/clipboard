from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify

from businesslogic import generate_uuid, clip_fetch_expired
from extensions import db
from models import Clipboard
from schemas import ClipboardSchema


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

@clip.route('/fetch/expired', methods=['GET', 'POST'])
def fetch_expired():
    
    # Get list of expired clipboards
    ahora = datetime.now()
    all_instances = clip_fetch_expired(ahora)
    
    # Serialize the data for the response
    schema = ClipboardSchema(many=True)
    data = schema.dump(all_instances)
    
    return jsonify(data)

@clip.route('/fetch/expire-incoming', methods=['GET', 'POST'])
def fetch_expire_incoming():
    
    # Get list of expired clipboards
    ahora = datetime.now()
    all_instances = Clipboard.query.filter(Clipboard.expire>ahora)
    
    # Serialize the data for the response
    schema = ClipboardSchema(many=True)
    data = schema.dump(all_instances)
    
    return jsonify(data)

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

@clip.route('/delete/expired', methods=['GET', 'POST'])
def delete_expired():
    
    # Get list of expired clipboards
    ahora = datetime.now()
    all_instances = clip_fetch_expired(ahora)
    
    # Serialize the data for the response
    schema = ClipboardSchema(many=True)
    data = schema.dump(all_instances)
    json_data = jsonify(data)

    # delete clips
    all_instances.delete()
    db.session.commit()

    return json_data
