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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const passport_1 = require("@nestjs/passport");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    create(request, createQuestionDto) {
        return this.questionService.create(request.user, createQuestionDto);
    }
    findAll() {
        return this.questionService.findAll();
    }
    findOne(id) {
        return this.questionService.findOne(+id);
    }
    postAnswer(id, answer, request) {
        return this.questionService.postAnswer(+id, answer, request.user);
    }
    likeAnswer(id, answerId, request) {
        return this.questionService.likeAnswer(+id, answerId, request.user);
    }
    remove(id, answerId, request) {
        return this.questionService.removeAnswer(+id, answerId, request.user);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Post)("post"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Post)("/answer/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("answer")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "postAnswer", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Put)("/like-answer/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("answerId")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "likeAnswer", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Put)("/delete-answer/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("answerId")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "remove", null);
QuestionController = __decorate([
    (0, common_1.Controller)("question"),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map