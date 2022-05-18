import ReactDOM from 'react-dom';
import LogBoxInspector from '../../LogBox/LogBoxInspectorContainer'

export default {
  show() {
    // Create a new div with ID `error-overlay` element and render LogBoxInspector into it.
    const div = document.createElement('div');
    div.id = 'error-overlay';
    ReactDOM.render(<LogBoxInspector />, div);
    document.body.appendChild(div);

  },
  hide() {
    // Remove div with ID `error-overlay`
    const div = document.getElementById('error-overlay');
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
    }
  },
};
