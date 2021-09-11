const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:4002/graphql/game' },
    { name: 'game', url: 'http://localhost:4002/graphql/user' },
  ],
});

const server = new ApolloServer({ 
  gateway,
  buildService: ({ url }) => new FileUploadDataSource({ url, useChunkedTransfer: true }),
});

server.listen().then(({ url }) => {
  console.log("HELLO FROM QUOC 187, Apolo federation is ready, services are ready");
  console.log(`🚀 Server ready at ${url}`);
});
