/// <reference types="passport" />
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: typeof User, jwtService: JwtService);
    singUpUser(dto: CreateUserDto): Promise<{
        success: boolean;
    }>;
    signIn(dto: SignInDto, response: Response): Promise<{
        message: string;
    }>;
    refreshToken(request: Request, response: Response): Promise<{
        message: string;
    }>;
    generateAccessToken(userId: number): Promise<string>;
    generateRefreshToken(userId: number): Promise<string>;
    getUserData(payload: Express.User): Promise<{
        id: number;
        username: string;
        logged: boolean;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
