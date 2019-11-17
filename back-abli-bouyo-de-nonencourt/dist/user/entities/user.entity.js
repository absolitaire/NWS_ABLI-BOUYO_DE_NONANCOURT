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
const address_entity_1 = require("./address.entity");
let UserEntity = class UserEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    swagger_1.ApiModelProperty({ description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'login', example: 'francisdu55' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "login", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "firstname", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Lastname', example: 'Cochran' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "lastname", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Address' }), class_transformer_1.Expose(),
    class_transformer_1.Type(() => address_entity_1.AddressEntity),
    __metadata("design:type", address_entity_1.AddressEntity)
], UserEntity.prototype, "address", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
UserEntity = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [Object])
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map