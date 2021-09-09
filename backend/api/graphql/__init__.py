# import asyncio

# from .services.Server import ServiceServer
# from .services.Server import service_config_list

# async def prepare():
    # app = []
    # for _, config in enumerate(service_config_list):
        # app.append(ServiceServer(config).run())
    # return await asyncio.gather(*app)

# def main():
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(prepare())
