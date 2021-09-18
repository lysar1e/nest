import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    email: string;
    username: string;
    password: string;
    is_admin: boolean;
    question: [];
    refreshToken: string;
}
