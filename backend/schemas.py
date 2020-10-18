from extensions import db, ma
from models import (
    Clipboard,
)


class ClipboardSchema(ma.ModelSchema):
    class Meta:
        model = Clipboard
        sqla_session = db.session
