import os

from mongoengine import connect, connection


class db():
    client: connection = None
    def __init__(self):
        host = os.environ['MONGO_DB_HOST']
        port = int(os.environ['MONGO_DB_PORT'])
        db_name = os.environ['MONGO_DB_NAME']
        alias = os.environ['MONGO_DB_ALIAS']
        if not self.client:
            client = connect(db=db_name, host=host, port=port, alias=alias)
            print(client)
            self.client = client
        else:
            print("CLIENT ALREADY CREATED, USE getDB to retrieve")

    def getDB(self) -> connection:
        return self.client
