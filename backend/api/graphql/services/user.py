import json
from os import path
import time
import asyncio
from ariadne import ObjectType, UnionType
from ariadne.contrib.federation import FederatedObjectType, make_federated_schema
from json import loads

from ariadne.load_schema import load_schema_from_path
from ariadne.asgi import GraphQL
import uvicorn

from api.db.models.User import User
from api.graphql.utils.Error import Error
from api.graphql.utils.user_utils import make_registed_message, validate_user_register_info

users = []
masters = []

cur_dir = path.dirname(__file__)

with open(path.join(cur_dir, '../../data/mockdata.json')) as f:
    content = f.read()
    data = loads(content)
    users = data['users']
    masters = data['masters']

user_query = FederatedObjectType("User")

@user_query.reference_resolver
def resolve_reference_user(_, _info, representation):
    print("Here in user reference XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n")
    print(representation,'\n')
    _id = representation['_id']
    found = [user for user in users if user['_id'] == _id]
    return found[0]

query = ObjectType("Query")

@query.field('users')
def resolve_users(_, _info, first):
    print('Here in query.users')
    return users[:first]

@query.field('user')
def resolve_user(_, _info, _id):
    print('Here in query.user')
    return users[_id - 1]

signup_result = UnionType("SignUpResult")
login_result = UnionType("LoginResult")

@signup_result.type_resolver
def determine_signup_result_type(obj, *_):
    if obj.get('message'):
        return "AlreadyRegisted"
    if obj.get("errors"):
        return "InvalidInput"
    if obj.get("token"):
        return "AuthToken"

@login_result.type_resolver
def determine_login_result_typ(obj, *_):
    if obj.get("token"):
        return "AuthToken"
    if obj.get("message"):
        return "LoginFailed"

mutation = ObjectType('Mutation')
@mutation.field('SignUp')
def sign_up(_, info, username=None, password=None, repassword=None, avatar=None):
    request = info.context
    print(request.files)
    input_error = validate_user_register_info(username, password, repassword)
    if input_error: return input_error
    existed_user = User.query(username=username)
    if len(existed_user): return make_registed_message()
    new_user = User(username=username, password = password)
    new_user.save(force_insert=True)
    print("created user", new_user.id)
    return {
        'token': 'your token here',
        'expiredAt': int(time.time() * 1000),
        'user': new_user
    }

@mutation.field('Login')
def log_in(_, info, username=None, password=None):
    users  = User.query(username=username)
    if not len(users):
        return {
            'message': 'Wrong username or password'
        }
    user = users[0]
    if user.password != password:
        return {
            'message': 'Wrong username or password'
        }
    return {
        'token': 'your token here',
        'expiredAt': int(time.time() * 1000),
        'user': user,
    }

type_defs = load_schema_from_path(path.join(cur_dir, '../typedefs/user.graphql'))

user_schema = make_federated_schema(type_defs, [ query, user_query, mutation, signup_result, login_result ])

from ariadne.asgi import GraphQL
user_gql = GraphQL(user_schema)

async def main():
    uvicorn.run(app=user_gql, host="localhost", port=1801)

if __name__ == '__main__':
    asyncio.run(main())
