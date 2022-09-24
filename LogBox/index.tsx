
import { Platform } from 'react-native';

import LogBoxNotificationContainer from './ErrorToast';

if (!global.setImmediate) {
    // @ts-expect-error: setImmediate is not defined
    global.setImmediate = function (fn) {
        return setTimeout(fn, 0);
    };
}

if (process.env.NODE_ENV === 'development' && Platform.OS === "web") {
    require("./LogBox").install();
}

export default LogBoxNotificationContainer;
