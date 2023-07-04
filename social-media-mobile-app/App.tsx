import { StatusBar } from "expo-status-bar";
import MainRouter from "./routers/MainRouter";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <MainRouter />
    </>
  );
};

export default App;
