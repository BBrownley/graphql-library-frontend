import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider
} from "@apollo/client";

// set up client object so we can send graphQL queries to the server
// when wrapping App component w/ a provider
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000"
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
