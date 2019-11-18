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
class FindMessagesDto {
}
__decorate([
    swagger_1.ApiModelProperty({ description: 'Unique identifier of the channel', example: '5763cd4dc378a38ecd387737' }),
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], FindMessagesDto.prototype, "idChannel", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Max number of messages to retrieve. -1 to retrieve every message.', example: '50' }),
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], FindMessagesDto.prototype, "threshold", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Retrieve messages starting with the N-th message', example: '51' }),
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], FindMessagesDto.prototype, "startingAt", void 0);
exports.FindMessagesDto = FindMessagesDto;
//# sourceMappingURL=find-messages.dto.js.map