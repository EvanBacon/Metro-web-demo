
import { Platform } from 'react-native';

import LogBoxNotificationContainer from './LogBoxNotificationContainer';

if (!global.setImmediate) {
    global.setImmediate = function (fn) {
        return setTimeout(fn, 0);
    };
}

if (process.env.NODE_ENV === 'development' && Platform.OS === "web") {
    require("./LogBox").install();
}

export default LogBoxNotificationContainer;
