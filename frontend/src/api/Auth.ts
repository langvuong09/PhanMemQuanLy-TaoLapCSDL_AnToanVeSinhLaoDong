import { Base } from "./Base";
import { AuthResponse } from "./types";

export class Auth extends Base {
    constructor() {
        const END_POINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";
        console.log("API Endpoint:", END_POINT);
        super({
            baseURL: END_POINT + "/auth/login"
        });
    }

    async Login(username: string, password: string): Promise<AuthResponse> {
        const result = await this.execute({
            method: "POST",
            data: { username: username, password: password }
        });

        return result;
    }
}