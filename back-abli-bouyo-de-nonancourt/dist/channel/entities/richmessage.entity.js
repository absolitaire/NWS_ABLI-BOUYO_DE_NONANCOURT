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
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
let RichMessageEntity = class RichMessageEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
    fillData(content, date, login, picture) {
        this.content = content;
        this.date = date;
        this.login = login;
        this.picture = picture;
    }
};
__decorate([
    swagger_1.ApiModelProperty({ description: 'Content', example: 'This is a funny message.' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], RichMessageEntity.prototype, "content", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Date of the message', example: '101343600000' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], RichMessageEntity.prototype, "date", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Login of author', example: 'francis' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], RichMessageEntity.prototype, "login", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Picture of user', example: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], RichMessageEntity.prototype, "picture", void 0);
RichMessageEntity = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [Object])
], RichMessageEntity);
exports.RichMessageEntity = RichMessageEntity;
//# sourceMappingURL=richmessage.entity.js.map