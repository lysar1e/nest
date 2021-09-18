"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async singUpUser(dto) {
        const { email, password, username } = dto;
        if (!email || !username || !password) {
            throw new common_1.BadRequestException();
        }
        const isEmailUsed = await this.userRepository.findOne({ email });
        const isUsernameUsed = await this.userRepository.findOne({ username });
        if (isEmailUsed) {
            throw new common_1.BadRequestException("Такой Email уже существует!");
        }
        if (isUsernameUsed) {
            throw new common_1.BadRequestException("Пользователь уже существует!");
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        await this.userRepository
            .create({
            email,
            username,
            password: hashedPassword,
        })
            .save();
        return { success: true };
    }
    async signIn(dto, response) {
        const { email, password } = dto;
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new common_1.BadRequestException("Такого пользователя не существует!");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException("Неверный пароль!");
        }
        const accessToken = await this.generateAccessToken(user.id);
        const refreshToken = await this.generateRefreshToken(user.id);
        response.cookie("access", accessToken, { httpOnly: true });
        response.cookie("refresh", refreshToken, { httpOnly: true });
        user.refreshToken = refreshToken;
        await user.save();
        return { message: "success" };
    }
    async refreshToken(request, response) {
        const refreshToken = await request.cookies["refresh"];
        const user = await this.userRepository.findOne({ refreshToken });
        if (!refreshToken) {
            throw new common_1.UnauthorizedException("You are not authenticated!");
        }
        if (!user) {
            throw new common_1.ForbiddenException("Refresh token is not valid!");
        }
        const validated = await this.jwtService.verifyAsync(refreshToken, {
            secret: process.env.REFRESH_JWT_SECRET,
        });
        const newAccessToken = await this.generateAccessToken(validated.id);
        const newRefreshToken = await this.generateRefreshToken(validated.id);
        user.refreshToken = newRefreshToken;
        await user.save();
        response.cookie("access", newAccessToken, { httpOnly: true });
        response.cookie("refresh", newRefreshToken, { httpOnly: true });
        return { message: "success" };
    }
    async generateAccessToken(userId) {
        return await this.jwtService.signAsync({ id: userId }, { expiresIn: "20m" });
    }
    async generateRefreshToken(userId) {
        return await this.jwtService.signAsync({ id: userId }, {
            secret: process.env.REFRESH_JWT_SECRET,
            expiresIn: "200d",
        });
    }
    async getUserData(payload) {
        const { id } = payload;
        const user = await this.userRepository.findOne({
            where: { id },
            select: ["id", "username"],
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return { id: user.id, username: user.username, logged: true };
    }
    async logout(response) {
        response.clearCookie("refresh");
        response.clearCookie("access");
        return { message: "success" };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map