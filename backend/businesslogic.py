import shortuuid

shortuuid_instance = shortuuid.ShortUUID()

def generate_uuid():
    return shortuuid_instance.random(length=3)
