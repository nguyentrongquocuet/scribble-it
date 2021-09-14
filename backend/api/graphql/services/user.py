from api.graphql.extensions.Common import CommonExtension
from os import path
import time
import asyncio
from ariadne import ObjectType, UnionType
from ariadne.contrib.federation import FederatedObjectType, make_federated_schema

from ariadne.load_schema import load_schema_from_path
from ariadne.asgi import GraphQL
import uvicorn

from api.db.models.User import User
from api.graphql.utils.user_utils import make_registed_message, validate_user_register_info
from api.graphql.utils.constant import DEFAULT_AVATAR
from api.graphql.utils.file_utils import parse_upload_url
from api.graphql.utils.resolver_utils import Status, StatusCode, make_query_result
from api.graphql.authentication.middleware import auth_middleware

cur_dir = path.dirname(__file__)

user_query = FederatedObjectType("User")


@user_query.reference_resolver
def resolve_reference_user(_, _info, representation):
    """Not implemented"""
    pass


query = ObjectType("Query")


@query.field('DefaultAvatar')
def resolve_default_avatar(_, __):
    return DEFAULT_AVATAR


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
    input_error = validate_user_register_info(username, password, repassword)
    if input_error:
        return make_query_result(input_error, status=Status.error)
    existed_user = User.query(username=username)
    if len(existed_user):
        return make_query_result(make_registed_message(), status=Status.error)
    avatar_url = parse_upload_url(avatar)
    print(avatar_url)
    new_user = User(username=username, password=password, avatar=avatar_url)
    new_user.save(force_insert=True)
    print("created user", new_user.id)
    return make_query_result({
        'token': 'your token here',
        'expiredAt': int(time.time() * 1000),
        'user': new_user
    })


@mutation.field('Login')
@auth_middleware()
def log_in(_, info, username=None, password=None):
    users = User.query(username=username)
    time.sleep(3)
    info.context['token'] = 'here is token'
    if not len(users):
        return make_query_result({
            'message': 'Wrong username or password',
        }, status=Status.error)
    user = users[0]
    if user.password != password:
        return make_query_result({
            'message': 'Wrong username or password'
        }, status=Status.error)
    if not user.avatar:
        user['avatar'] = DEFAULT_AVATAR
    return make_query_result({
        'token': 'your token here',
        'expiredAt': int(time.time() * 1000),
        'user': user,
    })


type_defs = load_schema_from_path(
    path.join(cur_dir, '../typedefs/user.graphql'))

user_schema = make_federated_schema(
    type_defs, [query, user_query, mutation, signup_result, login_result])

user_gql = GraphQL(user_schema, debug=True, extensions=[CommonExtension])


async def main():
    uvicorn.run(app=user_gql, host="localhost", port=1801)

if __name__ == '__main__':
    asyncio.run(main())
