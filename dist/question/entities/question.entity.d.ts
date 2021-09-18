import { BaseEntity } from "typeorm";
export declare class Question extends BaseEntity {
    id: number;
    question: string;
    tags: string;
    description: string;
    owner: number;
    username: string;
    answers: any[];
    views: number;
}
