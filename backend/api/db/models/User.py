import time
import os
from enum import Enum
import mongoengine

class UserRole(Enum):
    normal = "NORMAL"
    admin = "ADMIN"

class User(mongoengine.Document):
    username = mongoengine.StringField(required = True)
    password = mongoengine.StringField(required = True)
    created_at = mongoengine.IntField(default = time.time())
    avatar = mongoengine.StringField(default = "")
    role = mongoengine.EnumField(enum = UserRole)

    meta = {'db_alias': os.environ['MONGO_DB_ALIAS']}

    def get_id(self):
        return self.id
    id = property(get_id)

    @classmethod
    def find_by_name(cls, name):
       return User.query(username=name)

    @classmethod
    def find_by_id(cls, id):
        return User.query(id = id)
    
    @staticmethod
    def query(**kwars):
        return User.objects(**kwars)
