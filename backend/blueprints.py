from flask import Blueprint, request
from flask_sse import sse

from businesslogic import generate_uuid


clip = Blueprint('clip', __name__)


@clip.route('/save', methods=['POST'])
def save():

    json_data = request.get_json()
    text = json_data["clipboard"]["text"]

    return {
        "uuid": generate_uuid(),
        "text": text
    }

@clip.route('/fetch/<string:suuid>')
def fetch(suuid):
    return {
        "uuid": suuid,
        "text": ""
    }

@clip.route('/fetch', methods=['POST'])
def fetch_post():
    json_data = request.get_json()
    uuid = json_data["uuid"]
    return fetch(uuid)
