import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserProfile(username: string): Promise<{
        username: string;
        questions: import("../question/entities/question.entity").Question[];
    }>;
    findUsers(username: string): Promise<import("../auth/entities/user.entity").User[]>;
}
