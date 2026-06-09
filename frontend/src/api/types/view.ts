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
    value?: Activity;
}

export interface ViewData {
    items: ViewItem[];
    count: number;
    pageSize: number;
    pageNumber: number;
}

export interface ViewResponse {
    data: ViewData;
    code: number;
    message: string;
    success: boolean;
}
