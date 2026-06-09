import { Base } from "./Base";
import { ViewResponse } from "./types";

export class View extends Base {
    constructor() {
        const END_POINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";
        console.log("API Endpoint:", END_POINT);
        super({
            baseURL: END_POINT + "/views"
        });
    }

    async GetView(): Promise<ViewResponse> {
        const result = await this.execute<ViewResponse>({
            method: "GET",
        });

        console.log(result);

        return result;
    }
}