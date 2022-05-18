import "./runtime";

import { Platform } from "react-native";

if (__DEV__ && Platform.OS === "web") {
  require("./LogBox/LogBox").install();
}

import LogBoxNotificationContainer from "./LogBox/LogBoxNotificationContainer";

import { registerRootComponent } from "expo";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(() => (
  <>
    <App />
    <LogBoxNotificationContainer />
  </>
));
