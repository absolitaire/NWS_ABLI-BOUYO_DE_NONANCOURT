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
const login_service_1 = require("./login.service");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../user/entities/user.entity");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const rxjs_1 = require("rxjs");
const login_user_dto_1 = require("./dto/login-user.dto");
let LoginController = class LoginController {
    constructor(_loginService) {
        this._loginService = _loginService;
    }
    login(loginUserDto) {
        return this._loginService.login(loginUserDto);
    }
};
__decorate([
    swagger_1.ApiCreatedResponse({ description: 'The user has been successfully created', type: user_entity_1.UserEntity }),
    swagger_1.ApiConflictResponse({ description: 'The user already exists in the database' }),
    swagger_1.ApiBadRequestResponse({ description: 'Payload provided is not good' }),
    swagger_1.ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' }),
    swagger_1.ApiImplicitBody({ name: 'CreateUserDto', description: 'Payload to create a new user', type: create_user_dto_1.CreateUserDto }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    common_1.Controller('login'),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map