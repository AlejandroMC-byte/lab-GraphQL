const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 
const date = new Date().toLocaleDateString()
const random = Math.random()

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    alejandro(message: String!): String
    mauricio(message:String!): String
    nightwolf(message:String!): String
    camilo(message:String!): String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe`;
    },
    alejandro: (_, { message }) => {
        return `Hello, ${message}! this is a greeting from Alejandro Montero C. Buh-Bye!`;
    },

    mauricio: (_, { message }) => {
      return `HELLO! Your name is ${message}, isn't it? Very nice to meet you! This is Mauricio Carrillo speaking. Before I go, here, a random number that will change every time! ${random}`;
    },
    nightwolf: (_, { message }) => {
      return `Bonjour, ${message}! c'est un salutation de David Alberto, Au-revoir!, c'est ${date}`;
    },
    camilo: (_, { message }) => {
      return `Hello ${message}, Have a nice day! greeting from Camilo!, bye`;
    },
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
   const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
    app.use(express.static(reactAppPath));
    app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
    });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();