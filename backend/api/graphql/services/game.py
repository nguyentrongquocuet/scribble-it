from api.graphql.extensions.Common import CommonExtension
from os import path
from json import loads

import asyncio

from ariadne import ObjectType
from ariadne.contrib.federation import FederatedObjectType, make_federated_schema
from ariadne.load_schema import load_schema_from_path
from ariadne.asgi import GraphQL

import uvicorn

rooms = []

cur_dir = path.dirname(__file__)

type_defs = load_schema_from_path(
    path.join(cur_dir, '../typedefs/game.graphql'))
game_schema = make_federated_schema(type_defs, [])

game_gql = GraphQL(schema=game_schema, debug=True,
                   extensions=[CommonExtension])


class UserServer(uvicorn.Server):
    def run(self, sockets=None):
        self.config.setup_event_loop()
        return self.serve(sockets=sockets)


async def main():
    config = uvicorn.Config(app=game_gql, host="localhost", port=1800)
    s = UserServer(config)
    await s.run()

if __name__ == '__main__':
    asyncio.run(main())
