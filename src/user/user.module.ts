import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "../question/entities/question.entity";
import { User } from "../auth/entities/user.entity";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([Question, User])],
})
export class UserModule {}
