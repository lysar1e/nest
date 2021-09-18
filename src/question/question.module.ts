import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./entities/question.entity";
import { User } from "../auth/entities/user.entity";

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [TypeOrmModule.forFeature([Question, User])],
})
export class QuestionModule {}
