import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @UseGuards(AuthGuard("jwt"))
  @Post("post")
  create(
    @Req() request: Request,
    @Body() createQuestionDto: CreateQuestionDto
  ) {
    return this.questionService.create(request.user, createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.questionService.findOne(+id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/answer/:id")
  postAnswer(
    @Param("id") id: string,
    @Body("answer") answer: string,
    @Req() request: Request
  ) {
    return this.questionService.postAnswer(+id, answer, request.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("/like-answer/:id")
  likeAnswer(
    @Param("id") id: string,
    @Body("answerId") answerId: string,
    @Req() request: Request
  ) {
    return this.questionService.likeAnswer(+id, answerId, request.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("/delete-answer/:id")
  remove(
    @Param("id") id: string,
    @Body("answerId") answerId: string,
    @Req() request: Request
  ) {
    return this.questionService.removeAnswer(+id, answerId, request.user);
  }
}
