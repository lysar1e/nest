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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const typeorm_1 = require("typeorm");
let Question = class Question extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: "unique identifier",
    }),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: false,
    }),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: false,
    }),
    __metadata("design:type", String)
], Question.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "json",
        nullable: false,
    }),
    __metadata("design:type", String)
], Question.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        nullable: false,
    }),
    __metadata("design:type", Number)
], Question.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: false,
    }),
    __metadata("design:type", String)
], Question.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        default: [],
    }),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        default: 0,
    }),
    __metadata("design:type", Number)
], Question.prototype, "views", void 0);
Question = __decorate([
    (0, typeorm_1.Entity)("questions")
], Question);
exports.Question = Question;
//# sourceMappingURL=question.entity.js.map