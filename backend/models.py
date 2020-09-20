from extensions import db


class Clipboard(db.Model):

    __tablename__ = 'clipboards'
    __table_args__ = (db.UniqueConstraint('uuid'),)

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(3), nullable=False)
    text = db.Column(db.String(8000), nullable=False)
    expire = db.Column(db.DateTime, nullable=True)
