import { Base } from "./Base";
import { AuthData } from "./types/auth";

export class Auth extends Base {
    constructor() {
        const END_POINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";
        console.log("API Endpoint:", END_POINT);
        super({
            baseURL: END_POINT + "/auth",
        });
    }

    async Login(username: string, password: string): Promise<AuthData> {
        const result = await this.execute<AuthData>({
            url: "/login",
            method: "POST",
            data: { username: username, password: password }
        });

        if (result?.data) {
            return result.data;
        }

        throw Error(result?.message || "Thông tin đăng nhập không chính xác");
    }

    async Logout(): Promise<void> {
        const _ = await this.execute({
            url: "/logout",
            method: "POST"
        });
    }
}