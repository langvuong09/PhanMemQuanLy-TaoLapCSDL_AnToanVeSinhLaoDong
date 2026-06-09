export declare enum OtpType {
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
    VERIFY_ACCOUNT = "VERIFY_ACCOUNT"
}
export declare const getOtpKey: (type: OtpType, userId: string | number) => string;
