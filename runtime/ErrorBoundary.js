import React from "react";
import LogBoxNotificationContainer from "../LogBox/LogBoxNotificationContainer";

export class ErrorBoundary extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { hasError: false };
  //   }

  //   static getDerivedStateFromError(error) {
  //     // Update state so the next render will show the fallback UI.
  //     return { hasError: error };
  //   }

  //   componentDidCatch(error, errorInfo) {
  //     // You can also log the error to an error reporting service
  //     // logErrorToMyService(error, errorInfo);
  //   }

  render() {
    return (
      <>
        {this.props.children}
        <LogBoxNotificationContainer />
      </>
    );
  }
}
