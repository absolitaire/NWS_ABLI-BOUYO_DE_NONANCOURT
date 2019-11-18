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
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const handler_params_1 = require("./validators/handler-params");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    findAll() {
        return this._userService.findAll();
    }
    findOne(params) {
        return this._userService.findOne(params.id);
    }
    create(createUserDto) {
        return this._userService.create(createUserDto);
    }
    delete(params) {
        return this._userService.delete(params.id);
    }
    update(params, updateUserDto) {
        return this._userService.tryToUpdate(params.id, updateUserDto);
    }
};
__decorate([
    swagger_1.ApiOkResponse({ description: 'Returns an array of user', type: user_entity_1.UserEntity, isArray: true }),
    swagger_1.ApiNoContentResponse({ description: 'No user exists in database' }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiOkResponse({ description: 'Returns the user for the given "id"', type: user_entity_1.UserEntity }),
    swagger_1.ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' }),
    swagger_1.ApiBadRequestResponse({ description: 'Parameter provided is not good' }),
    swagger_1.ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' }),
    swagger_1.ApiImplicitParam({ name: 'id', description: 'Unique identifier of the user in the database', type: String }),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiCreatedResponse({ description: 'The user has been successfully created', type: user_entity_1.UserEntity }),
    swagger_1.ApiConflictResponse({ description: 'The user already exists in the database' }),
    swagger_1.ApiBadRequestResponse({ description: 'Payload provided is not good' }),
    swagger_1.ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' }),
    swagger_1.ApiImplicitBody({ name: 'CreateUserDto', description: 'Payload to create a new user', type: create_user_dto_1.CreateUserDto }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "create", null);
__decorate([
    swagger_1.ApiNoContentResponse({ description: 'The user has been successfully deleted' }),
    swagger_1.ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' }),
    swagger_1.ApiBadRequestResponse({ description: 'Parameter provided is not good' }),
    swagger_1.ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' }),
    swagger_1.ApiImplicitParam({ name: 'id', description: 'Unique identifier of the user in the database', type: String }),
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "delete", null);
__decorate([
    swagger_1.ApiOkResponse({ description: 'The user has been successfully updated', type: user_entity_1.UserEntity }),
    swagger_1.ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' }),
    swagger_1.ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' }),
    swagger_1.ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' }),
    swagger_1.ApiImplicitParam({ name: 'id', description: 'Unique identifier of the user in the database', type: String }),
    swagger_1.ApiImplicitBody({ name: 'UpdateUserDto', description: 'Payload to update a user', type: update_user_dto_1.UpdateUserDto }),
    common_1.Put(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "update", null);
UserController = __decorate([
    swagger_1.ApiUseTags('back/user'),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map