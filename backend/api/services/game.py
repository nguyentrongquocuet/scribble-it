from os import path
from json import loads

from ariadne import  ObjectType
from ariadne.contrib.federation import FederatedObjectType, make_federated_schema
from ariadne.load_schema import load_schema_from_path
from ariadne.asgi import GraphQL

import uvicorn

rooms = []

cur_dir = path.dirname(__file__)

with open(path.join(cur_dir, '../data/mockdata.json')) as f:
    content = f.read()
    data = loads(content)
    rooms = data['rooms']

game_query = FederatedObjectType("Room")

# @game_query.reference_resolver
# def resolve_room_reference(_, _info, representation):
    # print("ROOMMM", _, _info, representation)
    # return lambda *x, **kx: []
    # pass

@game_query.field("crew")
def resolve_crew(parent, info):
    print('Here in room.crew')
    crew = parent['crew']
    return crew

query = ObjectType("Query")

@query.field('rooms')
def resolve_rooms(_, info, first):
    print('here in rooms')
    return rooms[:first]

@query.field('room')
def resolve_room(_, info, _id):
    print('here in room')
    return rooms[_id - 1]

@query.field('crew')
def resolve_crew_by_room_id(_, info, _id):
    room = [room for room in rooms if room['_id'] == _id][0]
    print('here in crew')
    return room['crew']



type_defs = load_schema_from_path(path.join(cur_dir, '../typedefs/game.graphql'))
game_schema = make_federated_schema(type_defs, [ query, game_query ])

application = GraphQL(schema=game_schema, debug=True)

if __name__ == "__main__":
    uvicorn.run(app=application, host="localhost", port=1800)
