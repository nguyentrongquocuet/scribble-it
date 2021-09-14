from api.graphql.utils.resolver_utils import get_ctx_data
from ariadne.types import ExtensionSync
import graphql


class CommonExtension(ExtensionSync):
    def format(self, context: graphql.type.GraphQLResolveInfo.context):
        if not context:
            return {}
        context_data = get_ctx_data(context)
        print("xcxxxxxxxxxxxxxxxxxxxxxx", context_data)
        return {
            'access_token': context_data.access_token,
            'refresh_token': context_data.refresh_token,
            'user': context_data.user,
        }
