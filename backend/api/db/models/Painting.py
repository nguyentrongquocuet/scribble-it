import os
import mongoengine

class Painting(mongoengine.Document):
    offset = mongoengine.StringField()
    paths = mongoengine.ListField(default=lambda: [])

    meta = {'db_alias': os.environ['MONGO_DB_ALIAS']}
