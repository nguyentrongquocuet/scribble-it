from os import path
from ariadne import ObjectType
from ariadne.contrib.federation import FederatedObjectType, make_federated_schema
from json import loads

from ariadne.load_schema import load_schema_from_path
from ariadne.asgi import GraphQL
import uvicorn

users = []

cur_dir = path.dirname(__file__)

with open(path.join(cur_dir, '../data/mockdata.json')) as f:
    content = f.read()
    data = loads(content)
    users = data['users']

user_query = FederatedObjectType("User")

@user_query.reference_resolver
def resolve_reference_resolver(_, _info, representation):
    print("Here in user reference XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n")
    print(representation,'\n')
    _id = representation['_id']
    found = [user for user in users if user['_id'] == _id]
    return found[0]

@user_query.field("friends")
def resolve_user_friends(parent, info, first):
    print('here in query.friends')
    friends = parent['friends']
    return friends[: first]

query = ObjectType("Query")

@query.field('users')
def resolve_users(_, info, first):
    print('Here in query.users')
    return users[:first]

@query.field('user')
def resolve_user(_, info, _id):
    print('Here in query.user')
    return users[_id - 1]

type_defs = load_schema_from_path(path.join(cur_dir, '../typedefs/user.graphql'))

user_schema = make_federated_schema(type_defs, [ query, user_query ])

from ariadne.asgi import GraphQL
application = GraphQL(user_schema)

if __name__ == "__main__":
    uvicorn.run(app=application, host="localhost", port=1801)
