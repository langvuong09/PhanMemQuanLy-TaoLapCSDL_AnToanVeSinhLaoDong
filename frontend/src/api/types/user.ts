import { ElementAddress } from "../User";
import { MediaUpload } from "./media";

export type UserDetail = {
    id: string;
    username: string;
    email: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    position: string;
    avatar: MediaUpload;
    avatarId: string;

    address: string;
    province: ElementAddress;
    district: ElementAddress;
    ward: ElementAddress;

    quarter: string;
    doet: string;
    doetId: string;
    roleId: number;
    role: {
        id: number;
        name: string;
        code: string;
    };
    status: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
};