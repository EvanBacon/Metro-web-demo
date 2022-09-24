import ReactDOM from 'react-dom/client';

let currentRoot = null;
export default {
  show() {
    if (currentRoot) {
      return;
    }
    const LogBoxInspector = require('../../LogBoxInspectorContainer').default as typeof import('../../LogBoxInspectorContainer').default;
    // Create a new div with ID `error-overlay` element and render LogBoxInspector into it.
    const div = document.createElement('div');
    div.id = 'error-overlay';
    document.body.appendChild(div);

    currentRoot = ReactDOM.createRoot(div);
    currentRoot.render(<LogBoxInspector />);
  },
  hide() {
    // Remove div with ID `error-overlay`
    if (currentRoot) {
      currentRoot.unmount();
      currentRoot = null;
    }
    const div = document.getElementById('error-overlay');
    div?.remove();
  },
};
