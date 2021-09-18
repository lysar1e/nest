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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("./entities/question.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const uuid_1 = require("uuid");
let QuestionService = class QuestionService {
    constructor(questionRepository, userRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }
    async create(owner, createQuestionDto) {
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
    async findOne(id) {
        const quest = await this.questionRepository.findOne({ where: { id } });
        if (!quest) {
            throw new common_1.NotFoundException("Вопрос не найден!");
        }
        const answer = [];
        quest.views++;
        await quest.save();
        quest.answers.forEach((item) => {
            const { likes } = item, others = __rest(item, ["likes"]);
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
    async postAnswer(questionId, answer, owner) {
        const { id } = owner;
        const user = await this.userRepository.findOne({ id });
        const { username } = user;
        const question = await this.questionRepository.findOne({ id: questionId });
        const answerId = await (0, uuid_1.v4)();
        if (!question) {
            throw new common_1.NotFoundException();
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
    async likeAnswer(questionId, answerId, owner) {
        const { id } = owner;
        const user = await this.userRepository.findOne({ id });
        const { username } = user;
        const question = await this.questionRepository.findOne({ id: questionId });
        if (!question) {
            throw new common_1.NotFoundException();
        }
        const answer = question.answers.filter((item) => item.id === answerId);
        if (!answer) {
            throw new common_1.NotFoundException();
        }
        answer.forEach((item) => {
            const isLiked = item.likes.includes(username);
            if (isLiked) {
                const index = item.likes.indexOf(username);
                item.likes.splice(index, 1);
            }
            else {
                item.likes.push(username);
            }
        });
        await question.save();
        return { message: "success" };
    }
    async removeAnswer(questionId, answerId, owner) {
        const { id } = owner;
        const user = await this.userRepository.findOne({ id });
        const { username } = user;
        const question = await this.questionRepository.findOne({ id: questionId });
        if (!question) {
            throw new common_1.NotFoundException();
        }
        if (!user) {
            throw new common_1.ForbiddenException();
        }
        const answer = question.answers.filter((item) => item.id === answerId);
        if (!answer) {
            throw new common_1.NotFoundException();
        }
        answer.forEach((item) => {
            if (item.username !== username) {
                throw new common_1.ForbiddenException("Ты не можешь удалить чужой ответ!");
            }
            const index = question.answers.indexOf(item);
            question.answers.splice(index, 1);
        });
        await question.save();
        return { message: "success" };
    }
};
QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, Object])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map