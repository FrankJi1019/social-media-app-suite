import { StatusBar } from "expo-status-bar";
import MainRouter from "./routers/MainRouter";
import { PaperProvider } from "react-native-paper";
import { theme } from "./theme";
import GraphqlProvider from "./providers/GraphqlProvider";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <PaperProvider theme={theme}>
        <GraphqlProvider>
          <MainRouter />
        </GraphqlProvider>
      </PaperProvider>
    </>
  );
};

export default App;
