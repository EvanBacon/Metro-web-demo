import React from "react";

import ExceptionsManager from "./modules/ExceptionsManager";

export function useRejectionHandler() {
  const hasError = React.useRef(false);

  React.useEffect(() => {
    function onUnhandledError(ev: ErrorEvent) {
      hasError.current = true;

      const error = ev?.error;
      if (
        !error ||
        !(error instanceof Error) ||
        typeof error.stack !== "string"
      ) {
        return;
      }

      ExceptionsManager.handleException(
        error,
        // TODO(EvanBacon): Are these actually "fatal"?
        false
      );
    }

    function onUnhandledRejection(ev: PromiseRejectionEvent) {
      hasError.current = true;

      const reason = ev?.reason;
      if (
        !reason ||
        !(reason instanceof Error) ||
        typeof reason.stack !== "string"
      ) {
        return;
      }

      ExceptionsManager.handleException(
        reason,
        // TODO(EvanBacon): Are these actually "fatal"?
        false
      );
    }

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onUnhandledError);
    return () => {
      window.removeEventListener("error", onUnhandledError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return hasError;
}
