import { Base } from "./Base";
import { MediaUpload } from "./types/media";

export class Media extends Base {
    constructor() {
        const END_POINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3010";
        super({
            baseURL: END_POINT + "/api/v1/media",
        });
    }

    async UploadImage(data: FormData) {
        const result = await this.execute<MediaUpload>({
            url: "/upload",
            method: "POST",
            data: data
        });

        return result.data!;
    }
}