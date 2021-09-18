import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Response, Request } from "express";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singUpUser(dto: CreateUserDto): Promise<{
        success: boolean;
    }>;
    signIn(dto: SignInDto, response: Response): Promise<{
        message: string;
    }>;
    refreshToken(request: Request, response: Response): Promise<{
        message: string;
    }>;
    isLogin(request: Request): Promise<{
        id: number;
        username: string;
        logged: boolean;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
