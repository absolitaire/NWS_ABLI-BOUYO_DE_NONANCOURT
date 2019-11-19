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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let UserDao = class UserDao {
    constructor(_userModel) {
        this._userModel = _userModel;
    }
    find() {
        return rxjs_1.from(this._userModel.find({}))
            .pipe(operators_1.map((docs) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined));
    }
    findById(id) {
        return rxjs_1.from(this._userModel.findById(id))
            .pipe(operators_1.map((doc) => !!doc ? doc.toJSON() : undefined));
    }
    findByLogin(loginUser) {
        return rxjs_1.from(this._userModel.find({ login: loginUser }))
            .pipe(operators_1.map((docs) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined));
    }
    create(user) {
        return rxjs_1.from(this._userModel.create(user))
            .pipe(operators_1.map((doc) => doc.toJSON()));
    }
    findByIdAndUpdate(id, user) {
        return rxjs_1.from(this._userModel.findByIdAndUpdate(id, user, { new: true }))
            .pipe(operators_1.map((doc) => !!doc ? doc.toJSON() : undefined));
    }
    findByIdAndRemove(id) {
        return rxjs_1.from(this._userModel.findByIdAndRemove(id))
            .pipe(operators_1.map((doc) => !!doc ? doc.toJSON() : undefined));
    }
};
UserDao = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserDao);
exports.UserDao = UserDao;
//# sourceMappingURL=user.dao.js.map