import { FC, useMemo } from "react"
import { ProviderProps } from "../types/props"
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  createHttpLink,
  InMemoryCache
} from "@apollo/client"
import { useAuth } from "./CognitoAuthProvider"

interface GraphqlProviderProps extends ProviderProps {}

const GraphqlProvider: FC<GraphqlProviderProps> = ({ children }) => {
  const { getAccessTokenWithoutRefresh } = useAuth()

  const httpLink = useMemo(() => {
    return createHttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URL
    })
  }, [])

  const authLink = useMemo(() => {
    return new ApolloLink((operation, forward) => {
      const token = getAccessTokenWithoutRefresh()
      if (token) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${getAccessTokenWithoutRefresh()}`
          }
        })
      }
      return forward(operation)
    })
  }, [getAccessTokenWithoutRefresh])

  const apolloClient = useMemo(() => {
    return new ApolloClient({
      link: concat(authLink, httpLink),
      cache: new InMemoryCache()
    })
  }, [authLink, httpLink])

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default GraphqlProvider
