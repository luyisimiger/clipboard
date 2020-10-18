import shortuuid

from models import Clipboard


shortuuid_instance = shortuuid.ShortUUID()

def generate_uuid():
    return shortuuid_instance.random(length=3)

def clip_fetch_expired(ahora):
    
    # Get list of expired clipboards
    all_instances = Clipboard.query.filter(Clipboard.expire<=ahora)
    
    return all_instances
