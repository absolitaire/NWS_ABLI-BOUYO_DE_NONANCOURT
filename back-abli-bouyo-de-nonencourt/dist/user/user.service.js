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
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const user_entity_1 = require("../user/entities/user.entity");
const user_dao_1 = require("./dao/user.dao");
let UserService = class UserService {
    constructor(_userDao) {
        this._userDao = _userDao;
    }
    findAll() {
        return this._userDao.find()
            .pipe(operators_1.map(_ => !!_ ? _.map(__ => new user_entity_1.UserEntity(__)) : undefined));
    }
    findOne(id) {
        return this._userDao.findById(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(new user_entity_1.UserEntity(_)) :
            rxjs_1.throwError(new common_1.NotFoundException(`User with id '${id}' not found`))));
    }
    findByLogin(loginUser) {
        return this._userDao.findByLogin(loginUser)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(new user_entity_1.UserEntity(_)) :
            rxjs_1.throwError(new common_1.NotFoundException(`User with login '${loginUser}' not found`))));
    }
    create(user) {
        return this._addUser(user)
            .pipe(operators_1.flatMap(_ => this._userDao.create(_)), operators_1.catchError(e => e.code = 11000 ?
            rxjs_1.throwError(new common_1.ConflictException(`User already exists`)) :
            rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.map(_ => new user_entity_1.UserEntity(_)));
    }
    delete(id) {
        return this._userDao.findByIdAndRemove(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(undefined) :
            rxjs_1.throwError(new common_1.NotFoundException(`User with id '${id}' not found`))));
    }
    update(id, user) {
        return this._userDao.findByIdAndUpdate(id, user)
            .pipe(operators_1.catchError(e => e.code = 11000 ?
            rxjs_1.throwError(new common_1.ConflictException(`User already exists`)) :
            rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(new user_entity_1.UserEntity((_))) :
            rxjs_1.throwError(new common_1.NotFoundException(`User with id '${id}' not found`))));
    }
    tryToUpdate(id, user) {
        if (!!user.login) {
            return this._userDao.findByLogin(user.login)
                .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
                rxjs_1.throwError(new common_1.ConflictException(`User with login '${user.login}' doesn't exist`)) :
                this.update(id, user)));
        }
    }
    _addUser(user) {
        return rxjs_1.of(user);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_dao_1.UserDao])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map