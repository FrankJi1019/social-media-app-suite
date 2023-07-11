import { StatusBar } from "expo-status-bar";
import MainRouter from "./routers/MainRouter";
import { PaperProvider } from "react-native-paper";
import { theme } from "./theme";
import GraphqlProvider from "./providers/GraphqlProvider";
import CognitoAuthProvider from "./providers/CognitoAuthProvider";
import {
  COGNITO_CLIENT_ID,
  COGNITO_REGION,
  COGNITO_USER_POOL_ID,
} from "@env";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <PaperProvider theme={theme}>
        <CognitoAuthProvider
          clientId={COGNITO_CLIENT_ID}
          userPoolId={COGNITO_USER_POOL_ID}
          region={COGNITO_REGION}
        >
          <GraphqlProvider>
            <MainRouter />
          </GraphqlProvider>
        </CognitoAuthProvider>
      </PaperProvider>
    </>
  );
};

export default App;
