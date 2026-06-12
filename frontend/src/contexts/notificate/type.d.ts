export type Notificate = {
    id: string;
    type: "success" | "warning" | "error";
    message: string;
}

export type NotificatePayload = {
    type: "success" | "warning" | "error";
    message: string | Error | unknown;
}

export type NotificateContextType = {
    showNotification: (noti: NotificatePayload) => void;
    closeNotification: (id: string) => void;
}