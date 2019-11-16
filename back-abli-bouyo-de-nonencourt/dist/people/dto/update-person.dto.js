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
const person_address_dto_1 = require("./person-address.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class UpdatePersonDto {
}
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: 'Firstname', example: 'Mclaughlin' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "firstname", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: 'Lastname', example: 'Cochran' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "lastname", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: 'Entity where person works', example: 'UTARA' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "entity", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsPhoneNumber('FR'),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: 'Address' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInstance(person_address_dto_1.PersonAddressDto),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => person_address_dto_1.PersonAddressDto),
    __metadata("design:type", person_address_dto_1.PersonAddressDto)
], UpdatePersonDto.prototype, "address", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: 'Flag to know if this person is a manager', example: false }),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UpdatePersonDto.prototype, "isManager", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: 'Name of the manager', example: 'Mclaughlin' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "manager", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: 'Unique identifier of the manager', example: '5763cd4dc378a38ecd387737' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "managerId", void 0);
exports.UpdatePersonDto = UpdatePersonDto;
//# sourceMappingURL=update-person.dto.js.map