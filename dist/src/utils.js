"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const async_storage_1 = require("@react-native-async-storage/async-storage");
const Keychain = require("react-native-keychain");
var PinResultStatus;
(function (PinResultStatus) {
    PinResultStatus["initial"] = "initial";
    PinResultStatus["success"] = "success";
    PinResultStatus["failure"] = "failure";
    PinResultStatus["locked"] = "locked";
})(PinResultStatus = exports.PinResultStatus || (exports.PinResultStatus = {}));
exports.hasPinCode = async (serviceName) => {
    const res = await Keychain.getGenericPassword();
    return !!res && !!res.password;
};
exports.deletePinCode = async (serviceName) => {
    return await Keychain.resetGenericPassword();
};
exports.resetInternalStates = async (asyncStorageKeys) => {
    return await async_storage_1.default.multiRemove(asyncStorageKeys);
};
exports.noBiometricsConfig = react_native_1.Platform.select({
    android: {
        accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD,
    },
    ios: {}
});
