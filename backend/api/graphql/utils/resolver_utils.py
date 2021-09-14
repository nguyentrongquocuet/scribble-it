from typing import Optional

from flask.wrappers import Request
from api.db.models.User import User
from api.graphql.utils.constant import CTX_KEYS
from enum import Enum


class Status(Enum):
    error = 'ERROR'
    success = 'SUCCESS'


class StatusCode(Enum):
    success = 200
    created = 201
    not_authenticated = 401


def make_query_result(data=None, status: Status = Status.success, statusCode: StatusCode = StatusCode.success):
    return {
        'statusCode': statusCode.value,
        'status': status.value,
        'node': data
    }


class ContextData():
    request: Optional[Request] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    user: Optional[User] = None

    def __init__(self, context):
        if not context:
            return
        if not context.get:
            return
        self.request = context.get(CTX_KEYS['REQUEST'], None)
        self.access_token = context.get(CTX_KEYS['ACCESS_TOKEN'])
        self.refresh_token = context.get(CTX_KEYS['REFRESH_TOKEN'])
        self.user = context.get(CTX_KEYS['USER'])


def get_ctx_data(context):
    return ContextData(context=context)
