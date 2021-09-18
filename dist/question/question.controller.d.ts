import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { Request } from "express";
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(request: Request, createQuestionDto: CreateQuestionDto): Promise<import("./entities/question.entity").Question>;
    findAll(): Promise<import("./entities/question.entity").Question[]>;
    findOne(id: string): Promise<{
        id: number;
        question: string;
        tags: string;
        description: string;
        owner: number;
        username: string;
        answers: any[];
        views: number;
    }>;
    postAnswer(id: string, answer: string, request: Request): Promise<{
        message: string;
    }>;
    likeAnswer(id: string, answerId: string, request: Request): Promise<{
        message: string;
    }>;
    remove(id: string, answerId: string, request: Request): Promise<{
        message: string;
    }>;
}
