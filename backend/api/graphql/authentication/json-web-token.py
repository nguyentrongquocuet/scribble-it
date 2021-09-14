from api.graphql.authentication.key import JWT_KEY
import time
import jwt


def create_jwt_token(payload: dict, ttl: int) -> str:
    now = time.time() * 1000
    exp = ttl + now
    payload['exp'] = exp
    return jwt.encode(payload, JWT_KEY)
