from os import path
from ariadne import make_executable_schema, ObjectType
from json import loads

from ariadne.load_schema import load_schema_from_path

users = []

cur_dir = path.dirname(__file__)

with open(path.join(cur_dir, '../data/mockdata.json')) as f:
    content = f.read()
    data = loads(content)
    users = data['users']

user_query = ObjectType("User")

@user_query.field("friends")
def resolve_user_friends(parent, info, first):
    print("FRIENDS ",parent, info, first)
    friends = parent['friends']
    return friends[: first]

query = ObjectType("Query")

@query.field('users')
def resolve_users(_, info, first):
    print(_, info, first)
    return users[:first]

@query.field('user')
def resolve_user(_, info, _id):
    print(_, info, _id)
    return users[_id - 1]

type_defs = load_schema_from_path(path.join(cur_dir, '../typedefs/user.graphql'))

user_schema = make_executable_schema(type_defs, [ query, user_query ])
