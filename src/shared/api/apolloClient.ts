//configuración de apollo
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PERSONAL_API_TOKEN, URI_API } from "./api";

export const client = new ApolloClient({
  uri: URI_API,
  cache: new InMemoryCache(),
  headers: { Authorization: `Bearer ${PERSONAL_API_TOKEN}` },
});
