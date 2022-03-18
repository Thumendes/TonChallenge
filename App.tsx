import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import Router from "./src/Router";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <Router />
    </NativeBaseProvider>
  );
}
