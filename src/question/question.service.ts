import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./entities/question.entity";
import { User } from "../auth/entities/user.entity";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private questionRepository: typeof Question,
    @InjectRepository(User) private userRepository: typeof User
  ) {}
  async create(owner, createQuestionDto: CreateQuestionDto) {
    const { id } = owner;
    const user = await this.userRepository.findOne({ id });
    const { username } = user;
    const { question, tags, description } = createQuestionDto;
    const questionObject = {
      question,
      tags,
      description,
      owner: id,
      username,
    };
    return this.questionRepository.create(questionObject).save();
  }

  findAll() {
    return this.questionRepository.find({
      select: ["id", "question", "views"],
      order: { id: "DESC" },
    });
  }

  async findOne(id: number) {
    const quest = await this.questionRepository.findOne({ where: { id } });
    if (!quest) {
      throw new NotFoundException("Вопрос не найден!");
    }
    const answer = [];
    quest.views++;
    await quest.save();
    quest.answers.forEach((item) => {
      const { likes, ...others } = item;
      answer.push({
        id: others.id,
        likes: likes.length,
        answers: others.answer,
        username: others.username,
        owner: others.owner,
      });
    });
    return {
      id: quest.id,
      question: quest.question,
      tags: quest.tags,
      description: quest.description,
      owner: quest.owner,
      username: quest.username,
      answers: answer,
      views: quest.views,
    };
  }

  async postAnswer(questionId: number, answer: string, owner) {
    const { id } = owner;
    const user = await this.userRepository.findOne({ id });
    const { username } = user;
    const question = await this.questionRepository.findOne({ id: questionId });
    const answerId = await uuidv4();
    if (!question) {
      throw new NotFoundException();
    }
    const answerObject = {
      answer,
      username,
      likes: [],
      id: answerId,
    };
    question.answers.push(answerObject);
    await question.save();
    return { message: "success" };
  }
  async likeAnswer(questionId: number, answerId: string, owner) {
    const { id } = owner;
    const user = await this.userRepository.findOne({ id });
    const { username } = user;
    const question = await this.questionRepository.findOne({ id: questionId });
    if (!question) {
      throw new NotFoundException();
    }
    const answer = question.answers.filter((item) => item.id === answerId);
    if (!answer) {
      throw new NotFoundException();
    }
    answer.forEach((item) => {
      const isLiked = item.likes.includes(username);
      if (isLiked) {
        const index = item.likes.indexOf(username);
        item.likes.splice(index, 1);
      } else {
        item.likes.push(username);
      }
    });
    await question.save();
    return { message: "success" };
  }

  async removeAnswer(questionId: number, answerId: string, owner) {
    const { id } = owner;
    const user = await this.userRepository.findOne({ id });
    const { username } = user;
    const question = await this.questionRepository.findOne({ id: questionId });
    if (!question) {
      throw new NotFoundException();
    }
    if (!user) {
      throw new ForbiddenException();
    }
    const answer = question.answers.filter((item) => item.id === answerId);
    if (!answer) {
      throw new NotFoundException();
    }
    answer.forEach((item) => {
      if (item.username !== username) {
        throw new ForbiddenException("Ты не можешь удалить чужой ответ!");
      }
      const index = question.answers.indexOf(item);
      question.answers.splice(index, 1);
    });
    await question.save();
    return { message: "success" };
  }
}
