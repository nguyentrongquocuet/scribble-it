import uvicorn
from uvicorn.config import Config
from .user import user_gql
from .game import game_gql

class ServiceServer(uvicorn.Server):
    async def run(self, sockets=None):
        self.config.setup_event_loop()
        return await self.serve(sockets=sockets)

user_config = Config(app=user_gql, host="localhost", port=1802)
game_config = Config(app=game_gql, host="localhost", port=1800)


service_config_list = [user_config, game_config]
