import { SyntheticPlatformEmitter } from "expo-modules-core";

export function showMessage(message: string, type: "load" | "refresh") {
  SyntheticPlatformEmitter.emit("devLoadingView:showMessage", {
    message,
  });
}

export function hide() {
  SyntheticPlatformEmitter.emit("devLoadingView:hide", {});
}

export function dismissBuildError() {
  // TODO: Add a proper dismiss build error from react-error-overlay
  // in RN they use LogBox but this is pretty wild for web.
  console.clear();
}
