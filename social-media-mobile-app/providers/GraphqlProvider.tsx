import { FC, useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ProviderProps } from "../types/props";
import { GRAPHQL_URL } from "@env";

interface GraphqlProviderProps extends ProviderProps {}

const GraphqlProvider: FC<GraphqlProviderProps> = ({ children }) => {
  const httpLink = useMemo(() => {
    return createHttpLink({
      uri: "http://192.168.1.5:8000/graphql",
    });
  }, []);

  const apolloClient = useMemo(() => {
    return new ApolloClient({
      //   link: concat(authLink, httpLink),
      link: httpLink,
      cache: new InMemoryCache(),
    });
  }, [httpLink]);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
