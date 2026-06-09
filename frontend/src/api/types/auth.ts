export interface Role {
    id: number;
    role: string;
    name: string;
}

export interface Activity {
    get?: boolean;
    create?: boolean;
    update?: boolean;
    delete?: boolean;
    roleId: number;
}

export interface ViewItem {
    id: number;
    name: string;
    activities: Activity[];
    url: string;
    icon: string;
    parentId: number | null;
    doet_id: number | null;
    order: number;
    value: Activity;
}

export interface AuthData {
    token: string;
    views: ViewItem[];
}

export interface AuthResponse {
    data: AuthData;
    code: number;
    message: string;
    success: boolean;
}
