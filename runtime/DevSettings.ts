// This is for interacting with native functionality that isn't exposed in the browser
// all we can do is reload the page.
export default {
  reload: location.reload,
  onFastRefresh() {
    // noop
  },
};
