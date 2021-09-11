import asyncio

from flask.helpers import send_from_directory
from env import load
from api.graphql.services import socket
from ariadne.constants import PLAYGROUND_HTML
from ariadne import graphql_sync
from flask import Flask, request, jsonify
from graphql.error.graphql_error import GraphQLError

from api.graphql.services.game import game_schema
from api.graphql.services.user import user_schema

from api.db.db import db

app = Flask(__name__)

app.config['FLASK_ENV'] = "development"


@app.route("/resource/static/<path:path>", methods=["GET"])
def resolve_resource(path):
    print(f"path {path}")
    print(path)
    return send_from_directory(path=path, directory='public')


@app.route("/graphql", methods=["GET"])
def graphql_playground():
    # On GET request serve GraphQL Playground
    # You don't need to provide Playground if you don't want to
    # but keep on mind this will not prohibit clients from
    # exploring your API using desktop GraphQL Playground app.
    return PLAYGROUND_HTML, 200


def error_formatter(error: GraphQLError, debug=False):
    # Create formatted error data
    formatted = error.formatted
    # Replace original error message with custom one
    formatted["message"] = "INTERNAL SERVER ERROR"
    print(formatted)
    return formatted


@app.route("/graphql/user", methods=["POST"])
def graph_user_service():
    # GraphQL queries are always sent as POST
    data = request.get_json()

    # Note: Passing the request to the context is optional.
    # In Flask, the current request is always accessible as flask.request
    success, result = graphql_sync(
        game_schema,
        data,
        context_value=request,
        debug=app.debug,
        error_formatter=error_formatter
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code


@app.route("/graphql/game", methods=["POST"])
def graph_game_service():
    # GraphQL queries are always sent as POST
    data = request.get_json()

    # Note: Passing the request to the context is optional.
    # In Flask, the current request is always accessible as flask.request
    success, result = graphql_sync(
        user_schema,
        data,
        context_value=request,
        debug=app.debug,
        error_formatter=error_formatter
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code


async def run_flask():
    app.run('localhost', 4002)


async def run_socket():
    socket.sio.init_app(app=app)
    socket.sio.run(app, host='localhost', port=4002, debug=True)

if __name__ == "__main__":
    print("HELLO FROM QUOC187")
    DB = db()
    print("MONGODB IS READY, STARTING SOCKETIO")
    # asyncio.run(run_flask())
    asyncio.run(run_socket())
