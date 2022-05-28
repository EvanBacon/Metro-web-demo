if (__DEV__) {
  const _ws = new global.WebSocket(`ws://${window.location.host}/message`);
  _ws.onmessage = (message) => {
    const data = JSON.parse(String(message.data));
    switch (data.method) {
      case "sendDevCommand":
        switch (data.params.name) {
          case "reload":
            window.location.reload();
            break;
        }
        break;
      case "reload":
        window.location.reload();
        break;
      case "devMenu":
        // alert("[dev menu]");
        break;
    }
  };
}
