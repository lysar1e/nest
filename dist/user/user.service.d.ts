import { Question } from "../question/entities/question.entity";
import { User } from "../auth/entities/user.entity";
export declare class UserService {
    private questionRepository;
    private userRepository;
    constructor(questionRepository: typeof Question, userRepository: typeof User);
    getUserProfile(username: string): Promise<{
        username: string;
        questions: Question[];
    }>;
    findUsers(username: string): Promise<User[]>;
}
