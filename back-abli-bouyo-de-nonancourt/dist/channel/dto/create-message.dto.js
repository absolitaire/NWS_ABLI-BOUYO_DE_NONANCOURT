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
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMessageDto {
}
__decorate([
    swagger_1.ApiModelProperty({ description: 'Unique identifier of the author', example: '5763cd4dc378a38ecd387737' }),
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "idUser", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Description of the channel', example: 'Channel for the fans of Basketball' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Unique identifier of the channel', example: '5763cd4dc378a38ecd387737' }),
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "idChannel", void 0);
exports.CreateMessageDto = CreateMessageDto;
//# sourceMappingURL=create-message.dto.js.map