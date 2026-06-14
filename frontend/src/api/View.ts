import { Base } from "./Base";
import { ViewResponse, ViewData } from "./types/view";

export class View extends Base {
    constructor() {
        const END_POINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";
        console.log("API Endpoint:", END_POINT);
        super({
            baseURL: END_POINT + "/views"
        });
    }

    async GetView(): Promise<ViewResponse> {
        const result = await this.execute<ViewData>({
            method: "GET",
        });

        console.log(result);

        return {
            success: result.success,
            code: result.code,
            message: result.message || "",
            data: result.data || { items: [], count: 0, pageSize: 10, pageNumber: 1 }
        };
    }
}