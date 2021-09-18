import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "../question/entities/question.entity";
import { User } from "../auth/entities/user.entity";
import { Like } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Question) private questionRepository: typeof Question,
    @InjectRepository(User) private userRepository: typeof User
  ) {}

  async getUserProfile(username: string) {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new NotFoundException("Пользователь не найден!");
    }
    const userQuestions = await this.questionRepository.find({
      where: { username },
      select: ["id", "question", "views"],
      order: { id: "DESC" },
    });
    return { username, questions: userQuestions };
  }

  async findUsers(username: string) {
    return await this.userRepository.find({
      where: { username: Like(`%${username}%`) },
      select: ["id", "username"],
    });
  }
}
