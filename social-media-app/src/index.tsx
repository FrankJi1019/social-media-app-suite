import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import CognitoAuthProvider from "./providers/CognitoAuthProvider"
import "./index.css"
import { QueryClientProvider, QueryClient } from "react-query"
import GraphqlProvider from "./providers/GraphqlProvider"
import { PrismicProvider } from "@prismicio/react"
import { client } from "./prismic"
import NotificationProvider from "./providers/NotificationProvider"
import { theme } from "./theme"
import "./fonts.css"
import MessagingSocketProvider from "./providers/MessagingSocketProvider"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <CognitoAuthProvider
      clientId={process.env.REACT_APP_COGNITO_CLIENT_ID as string}
      userPoolId={process.env.REACT_APP_COGNITO_USER_POOL_ID as string}
      region={process.env.REACT_APP_COGNITO_REGION as string}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={new QueryClient()}>
            <GraphqlProvider>
              <PrismicProvider client={client}>
                <NotificationProvider>
                  <MessagingSocketProvider
                    socketUrl={process.env.REACT_APP_SOCKET_URL as string}
                  >
                    <App />
                  </MessagingSocketProvider>
                </NotificationProvider>
              </PrismicProvider>
            </GraphqlProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </CognitoAuthProvider>
  </React.StrictMode>
)
