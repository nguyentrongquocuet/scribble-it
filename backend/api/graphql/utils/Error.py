from graphql.error.graphql_error import GraphQLError


class Error(GraphQLError):
    http_code: int = 200
    def __init__(self, message:str, http_code: int = 200, *args, **kargs) -> None:
        super().__init__(message,*args, **kargs )
        self.http_code = http_code
