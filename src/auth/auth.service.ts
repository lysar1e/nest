import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: typeof User,
    private jwtService: JwtService
  ) {}
  async singUpUser(dto: CreateUserDto) {
    const { email, password, username } = dto;
    if (!email || !username || !password) {
      throw new BadRequestException();
    }
    const isEmailUsed = await this.userRepository.findOne({ email });
    const isUsernameUsed = await this.userRepository.findOne({ username });
    if (isEmailUsed) {
      throw new BadRequestException("Такой Email уже существует!");
    }
    if (isUsernameUsed) {
      throw new BadRequestException("Пользователь уже существует!");
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

  async signIn(dto: SignInDto, response: Response) {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new BadRequestException("Такого пользователя не существует!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Неверный пароль!");
    }

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    response.cookie("access", accessToken, { httpOnly: true });
    response.cookie("refresh", refreshToken, { httpOnly: true });
    user.refreshToken = refreshToken;
    await user.save();
    return { message: "success" };
  }

  async refreshToken(request: Request, response: Response) {
    const refreshToken = await request.cookies["refresh"];
    const user = await this.userRepository.findOne({ refreshToken });
    if (!refreshToken) {
      throw new UnauthorizedException("You are not authenticated!");
    }
    if (!user) {
      throw new ForbiddenException("Refresh token is not valid!");
    }
    const validated = await this.jwtService.verifyAsync(refreshToken, {
      secret: "Tv9hSdJ51H8yOoFuyZ24ef6MBDItD8Tb",
    });
    const newAccessToken = await this.generateAccessToken(validated.id);
    const newRefreshToken = await this.generateRefreshToken(validated.id);
    user.refreshToken = newRefreshToken;
    await user.save();
    response.cookie("access", newAccessToken, { httpOnly: true });
    response.cookie("refresh", newRefreshToken, { httpOnly: true });
    return { message: "success" };
  }
  async generateAccessToken(userId: number) {
    return await this.jwtService.signAsync(
      { id: userId },
      { expiresIn: "20m" }
    );
  }
  async generateRefreshToken(userId: number) {
    return await this.jwtService.signAsync(
      { id: userId },
      {
        secret: "Tv9hSdJ51H8yOoFuyZ24ef6MBDItD8Tb",
        expiresIn: "200d",
      }
    );
  }

  async getUserData(payload: Express.User) {
    // @ts-ignore
    const { id } = payload;
    const user = await this.userRepository.findOne({
      where: { id },
      select: ["id", "username"],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id, username: user.username, logged: true };
  }

  async logout(response: Response) {
    response.clearCookie("refresh");
    response.clearCookie("access");
    return { message: "success" };
  }
}
