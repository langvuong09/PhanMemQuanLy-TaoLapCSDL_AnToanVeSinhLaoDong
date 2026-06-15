export type MediaUpload = {
    id: string;
    originalFilename: string;
    url: string;
    secureUrl: string;
    publicId: string;
    format: string;
    type: string;
    width: number;
    height: number;
    fileType: string;
    doetId: string | null;
    createdAt: Date;
}