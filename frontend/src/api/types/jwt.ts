export type Jwt = {
    id: number;
    username: string;
    realRole: any;
    avatar: any;
    role: JwtRole;
    unitId: any;
    workUnit: any;
    iat: number;
    exp: number;
    iss: number;
}

export type JwtRole = {
    id: 4;
    role: string;
    name: string;
}