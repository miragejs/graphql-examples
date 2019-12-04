import { Server, Model } from "miragejs";
import { buildSchema, graphql } from "graphql";

let graphqlSchema = buildSchema(`
  type Query {
    movies: [Movie]
  }

  type Movie {
    id: ID!
    title: String!
  }
`);

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    environment,

    models: {
      movie: Model
    },

    seeds(server) {
      server.create("movie", { title: "Interstellar" });
      server.create("movie", { title: "Inception" });
      server.create("movie", { title: "The Dark Knight" });
    },

    routes() {
      this.post("/graphql", (schema, request) => {
        let requestJson = JSON.parse(request.requestBody);
        let query = requestJson.query;
        let variables = requestJson.variables;

        let resolver = {
          movies() {
            return schema.db.movies;
          }
        };

        return graphql(graphqlSchema, query, resolver, null, variables);
      });
    }
  });
}
