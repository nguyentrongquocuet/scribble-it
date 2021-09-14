import graphql

from api.graphql.utils.resolver_utils import Status, StatusCode, make_query_result


def auth_middleware(**options):
    print(options)
    middle_ware = options.get('middle_ware', defalt_auth_middleware)
    auth_resolver = options.get('auth_resolver', default_auth_resolver)

    def _(resolver):
        def _resolver(obj, info: graphql.type.GraphQLResolveInfo, **args):
            if middle_ware:
                is_authenticated = middle_ware(obj, info, **args)
                if not is_authenticated:
                    if auth_resolver:
                        return auth_resolver(obj, info, **args)
            req = info.context.get('request')
            headers = req.headers
            if headers:
                print('header', headers)
                print(headers.get('authorization', None))
            # Implements JWT here
            return resolver(obj, info, **args)
        return _resolver
    return _


def defalt_auth_middleware(obj, info: graphql.type.GraphQLResolveInfo, **args):
    request = info.context.get('request')
    if not request:
        return False
    headers = request.headers
    token = headers.get('Authorization', None)
    print(headers)
    if not token:
        return False
    return bool(token)


def default_auth_resolver(obj, info, **args):
    return make_query_result({
        'message': 'Not authenticated'
    }, status=Status.error, statusCode=StatusCode.not_authenticated)
