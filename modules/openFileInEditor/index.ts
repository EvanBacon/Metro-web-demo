function openFileInEditor(file: string, lineNumber: number) {
  if (__DEV__) {
    // TODO: This is not a great URL since it now blocks users from accessing the `/open-stack-frame` url in their router
    // ideally it would be something like `/_devtools/open-stack-frame`.
    fetch(window.location.host + "/open-stack-frame", {
      method: "POST",
      body: JSON.stringify({ file, lineNumber }),
    });
  }
}

export default openFileInEditor;
