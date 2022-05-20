export function showMessage(message: string, type: "load" | "refresh") {
  const { SyntheticPlatformEmitter } = require("expo-modules-core");
  SyntheticPlatformEmitter.emit("devLoadingView:showMessage", {
    message,
  });
}

export function hide() {
  const { SyntheticPlatformEmitter } = require("expo-modules-core");
  SyntheticPlatformEmitter.emit("devLoadingView:hide", {});
}

export function dismissBuildError() {
  // TODO: Add a proper dismiss build error from react-error-overlay
  console.clear();
}
