import { Platform, NativeModules } from "react-native";

// Hack: Ensure the dev loading view works
Object.defineProperty(NativeModules, "DevLoadingView", {
  get() {
    return {
      name: "DevLoadingView",
      startObserving() {},
      stopObserving() {},
    };
  },
});

/**
 * Sets up developer tools for React Native.
 * You can use this module directly, or just require InitializeCore.
 */
if (__DEV__) {
  if (!global.__RCTProfileIsProfiling) {
    require("./setUpReactDevTools");

    //   // Set up inspector
    //   const JSInspector = require('../JSInspector/JSInspector');
    //   JSInspector.registerAgent(require('../JSInspector/NetworkAgent'));
  }

  // Note we can't check if console is "native" because it would appear "native" in JSC and Hermes.
  // We also can't check any properties that don't exist in the Chrome worker environment.
  // So we check a navigator property that's set to a particular value ("Netscape") in all real browsers.
  const isLikelyARealBrowser =
    global.navigator != null &&
    /*              _
     *             | |
     *   _ __   ___| |_ ___  ___ __ _ _ __   ___
     *  | '_ \ / _ \ __/ __|/ __/ _` | '_ \ / _ \
     *  | | | |  __/ |_\__ \ (_| (_| | |_) |  __/
     *  |_| |_|\___|\__|___/\___\__,_| .__/ \___|
     *                               | |
     *                               |_|
     */

    global.navigator.appName === "Netscape"; // Any real browser

  if (!Platform.isTesting) {
    const HMRClient = require("./HMRClient");
    console.log("mock logs");
    if (console._isPolyfilled) {
      // We assume full control over the console and send JavaScript logs to Metro.
      [
        "trace",
        "info",
        "warn",
        "error",
        "log",
        "group",
        "groupCollapsed",
        "groupEnd",
        "debug",
      ].forEach((level) => {
        const originalFunction = console[level];
        console[level] = function (...args) {
          HMRClient.log(level, args);
          originalFunction.apply(console, args);
        };
      });
    } else {
      // We assume the environment has a real rich console (like Chrome), and don't hijack it to log to Metro.
      // It's likely the developer is using rich console to debug anyway, and hijacking it would
      // lose the filenames in console.log calls: https://github.com/facebook/react-native/issues/26788.
      HMRClient.log("log", [
        `JavaScript logs will appear in your ${
          isLikelyARealBrowser ? "browser" : "environment"
        } console`,
      ]);
    }
  }

  require("./setUpReactRefresh");

  if (Platform.OS === "web") {
    const HMRClient = require("./HMRClient");

    // This is called native on native platforms
    HMRClient.setup(
      Platform.OS,
      "./index.js",
      window.location.hostname,
      window.location.port,
      true,
      "ws"
    );
  }
}
