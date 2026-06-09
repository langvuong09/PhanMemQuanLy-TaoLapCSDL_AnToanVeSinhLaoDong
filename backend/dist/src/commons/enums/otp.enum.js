"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOtpKey = exports.OtpType = void 0;
var OtpType;
(function (OtpType) {
    OtpType["FORGOT_PASSWORD"] = "FORGOT_PASSWORD";
    OtpType["VERIFY_ACCOUNT"] = "VERIFY_ACCOUNT";
})(OtpType || (exports.OtpType = OtpType = {}));
const getOtpKey = (type, userId) => {
    return `otp:${type}:${userId}`;
};
exports.getOtpKey = getOtpKey;
//# sourceMappingURL=otp.enum.js.map