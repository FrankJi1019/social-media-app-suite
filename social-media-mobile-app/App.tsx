import { StatusBar } from "expo-status-bar";
import MainRouter from "./routers/MainRouter";
import { PaperProvider } from "react-native-paper";
import { theme } from "./theme";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <PaperProvider theme={theme}>
        <MainRouter />
      </PaperProvider>
    </>
  );
};

export default App;
