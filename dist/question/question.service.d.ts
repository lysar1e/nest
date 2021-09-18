import { Question } from "./entities/question.entity";
import { User } from "../auth/entities/user.entity";
import { CreateQuestionDto } from "./dto/create-question.dto";
export declare class QuestionService {
    private questionRepository;
    private userRepository;
    constructor(questionRepository: typeof Question, userRepository: typeof User);
    create(owner: any, createQuestionDto: CreateQuestionDto): Promise<Question>;
    findAll(): Promise<Question[]>;
    findOne(id: number): Promise<{
        id: number;
        question: string;
        tags: string;
        description: string;
        owner: number;
        username: string;
        answers: any[];
        views: number;
    }>;
    postAnswer(questionId: number, answer: string, owner: any): Promise<{
        message: string;
    }>;
    likeAnswer(questionId: number, answerId: string, owner: any): Promise<{
        message: string;
    }>;
    removeAnswer(questionId: number, answerId: string, owner: any): Promise<{
        message: string;
    }>;
}
