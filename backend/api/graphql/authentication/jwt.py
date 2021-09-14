from api.db.models.User import User
from enum import Enum
from api.graphql.authentication.key import JWT_KEY
import time
import jwt

# One week
ACCESS_TOKEN_TIME = 3600 * 24 * 7
# One hour
REFRESH_TOKEN_TIME = 3600


class TokenVerifyResult(Enum):
    valid = 'VALID'
    invalid = 'INVALID'
    expired = 'EXPIRED'


def create_jwt_token(payload: dict, ttl: int) -> str:
    """
    Creates token for user, ttl in SECOND
    Returns token with expire time in MILISECOND
    """
    now = time.time() * 1000
    exp = ttl * 1000 + now
    payload['exp'] = exp
    return jwt.encode(payload, JWT_KEY)


def create_user_token(user: User, ttl=3600):
    id = user.id
    payload = {
        'id': id
    }
    return create_jwt_token(payload, ttl)


def create_user_access_token(user: User):
    return create_user_token(user, ACCESS_TOKEN_TIME)


def create_user_refresh_token(user: User):
    return create_user_token(user, REFRESH_TOKEN_TIME)


def verify_jwt_token(token: str):
    try:
        decoded = jwt.decode(token, JWT_KEY)
        return {
            'result': TokenVerifyResult.valid,
            'decoded': decoded
        }
    except jwt.ExpiredSignatureError:
        return {
            'result': TokenVerifyResult.expired,
            'decoded': None
        }
    except jwt.DecodeError:
        return {
            'result': TokenVerifyResult.invalid,
            'decoded': None
        }
