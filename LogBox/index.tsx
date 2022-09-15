if (!global.setImmediate) {
    global.setImmediate = function (fn) {
        return setTimeout(fn, 0);
    };
}

import { Platform } from "react-native";

if (process.env.NODE_ENV === 'development' && Platform.OS === "web") {
    require("./LogBox").install();
}

import LogBoxNotificationContainer from "./LogBoxNotificationContainer";

export default LogBoxNotificationContainer;