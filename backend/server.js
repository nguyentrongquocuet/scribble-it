const { ApolloGateway } = require("@apollo/gateway");
const {RemoteGraphQLDataSource} = require('@apollo/gateway');
const {ApolloServer} = require("apollo-server");
const express = require('express');

class DataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context, }) {
    const req = context.req;
    if (req) {
      const headers = req.headers;
      if (headers) {
        forwardList.forEach((key) => {
          const v = headers[key];
          if (v)
            request.http.headers.set(key,v);
        })
      }
    }
  }

  async didReceiveResponse({ response, request, context}) {
    const res = context.res;
    if (res) {
      console.log(res);
      res.cookie('hello', 'w', {
      });
    }
    console.log(response.extensions)
    return response;
  }
}

const forwardList = ['authorization']

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:4002/graphql/game' },
    { name: 'game', url: 'http://localhost:4002/graphql/user' },
  ],
  buildService({ name, url }) {
      return new DataSource({
        url,
      });
    },
});

const app = express();

const server = new ApolloServer({ 
  gateway,
  context: (ctx) => {
    return ctx;
  },
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  }
});


server.listen(4000).then(() => {
  console.log('listened');
});
