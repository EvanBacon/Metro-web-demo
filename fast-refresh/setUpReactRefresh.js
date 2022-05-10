if (__DEV__) {
  // This needs to run before the renderer initializes.
  const ReactRefreshRuntime = require("react-refresh/runtime");
  ReactRefreshRuntime.injectIntoGlobalHook(global);

  const Refresh = {
    performFullRefresh(reason) {
      console.log("perform full refresh");
      const DevSettings = require("./DevSettings").default;
      DevSettings.reload(reason);
    },

    createSignatureFunctionForTransform:
      ReactRefreshRuntime.createSignatureFunctionForTransform,

    isLikelyComponentType: ReactRefreshRuntime.isLikelyComponentType,

    getFamilyByType: ReactRefreshRuntime.getFamilyByType,

    register: ReactRefreshRuntime.register,

    performReactRefresh() {
      console.log("perform react refresh");
      const DevSettings = require("./DevSettings").default;
      if (ReactRefreshRuntime.hasUnrecoverableErrors()) {
        DevSettings.reload("Fast Refresh - Unrecoverable");
        return;
      }
      ReactRefreshRuntime.performReactRefresh();
      DevSettings.onFastRefresh();
    },
  };

  // The metro require polyfill can not have dependencies (applies for all polyfills).
  // Expose `Refresh` by assigning it to global to make it available in the polyfill.
  global[(global.__METRO_GLOBAL_PREFIX__ || "") + "__ReactRefresh"] = Refresh;
}
