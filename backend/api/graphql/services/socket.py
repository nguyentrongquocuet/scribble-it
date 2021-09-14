import json
from collections import defaultdict
from flask_socketio import SocketIO
from flask import request

sio = SocketIO(cors_allowed_origins="*")
i = 0
count = defaultdict(lambda: 0)
paths = []


def next_i():
    global i
    i = i + 1
    return i


def get_order():
    while True:
        yield next_i()


gen = get_order()

file = open('data.txt', 'a+')


def write_data(data):
    global paths
    paths.append(data)


def refresh_data():
    global paths
    if len(paths):
        paths.clear()


@sio.on('connect')
def on_connect(*args, **kwargs):
    order = gen.__next__()
    print("+++++++++++++++++==", order)
    sid = request.sid
    print(args, kwargs, sid)
    if order % 2 == 1:
        sio.emit("init", to=sid)


@sio.on('disconnect')
def on_disconnect():
    sid = request.sid
    print(count[sid])
    refresh_data()


@sio.on('draw')
def on_draw(data):
    global count
    sid = request.sid
    count[sid] += 1
    print(data)
    write_data(json.dumps(data))
    sio.emit("draw", data=data, skip_sid=sid)
