export function getPlatform() {
  return process.env.PLATFORM || "web";
}

export function showMessage(message: string, type: "load" | "refresh") {
  console.log("show:message");
  const { SyntheticPlatformEmitter } = require("expo-modules-core");

  SyntheticPlatformEmitter.emit("devLoadingView:showMessage", {
    message,
  });
}
export function hide() {
  console.log("hide");
  const { SyntheticPlatformEmitter } = require("expo-modules-core");

  SyntheticPlatformEmitter.emit("devLoadingView:hide", {});
}

export function dismissBuildError() {
  // TODO: Add a proper dismiss build error from react-error-overlay
  console.clear();
}
