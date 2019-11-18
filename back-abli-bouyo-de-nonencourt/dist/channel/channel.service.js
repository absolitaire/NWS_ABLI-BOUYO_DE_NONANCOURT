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
const rxjs_1 = require("rxjs");
const channel_entity_1 = require("./entities/channel.entity");
const operators_1 = require("rxjs/operators");
const channel_dao_1 = require("./dao/channel.dao");
let ChannelService = class ChannelService {
    constructor(_channelDao) {
        this._channelDao = _channelDao;
    }
    findAll() {
        return this._channelDao.findAllChannels()
            .pipe(operators_1.map(_ => !!_ ? _.map(__ => new channel_entity_1.ChannelEntity(__)) : undefined));
    }
    findOne(id) {
        return this._channelDao.findChannelById(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(new channel_entity_1.ChannelEntity(_)) :
            rxjs_1.throwError(new common_1.NotFoundException(`Channel with id '${id}' not found`))));
    }
    create(channel) {
        return this._addChannel(channel)
            .pipe(operators_1.flatMap(_ => this._channelDao.createChannel(_)), operators_1.catchError(e => e.code = 11000 ?
            rxjs_1.throwError(new common_1.ConflictException(`A channel with the id '${channel.idChannel}' already exists`, e.message)) :
            rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.map(_ => new channel_entity_1.ChannelEntity(_)));
    }
    _addChannel(channel) {
        return rxjs_1.of(channel);
    }
    delete(id) {
        return this._channelDao.findChannelByIdAndRemove(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(undefined) :
            rxjs_1.throwError(new common_1.NotFoundException(`Channel with id '${id}' not found`))));
    }
    subscribe(sub) {
        if (!!this._channelDao.findChannelById(sub.idChannel)) {
            return this._channelDao.subscribe(sub)
                .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
                rxjs_1.of(undefined) :
                rxjs_1.throwError(new common_1.ConflictException(`Channel with id '${sub.idChannel}' don't exists or user'${sub.idUser}' is already subscribed to this channel`))));
        }
        else {
            rxjs_1.throwError(new common_1.NotFoundException(`Channel with id '${sub.idChannel}' not found.`));
        }
    }
    unsubscribe(sub) {
        if (!!this._channelDao.findChannelById(sub.idChannel)) {
            return this._channelDao.unsubscribe(sub)
                .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
                rxjs_1.of(undefined) :
                rxjs_1.throwError(new common_1.NotFoundException(`User with id '${sub.idUser}' not found`))));
        }
        else {
            rxjs_1.throwError(new common_1.NotFoundException(`Channel with id '${sub.idChannel}' not found.`));
        }
    }
};
ChannelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [channel_dao_1.ChannelDao])
], ChannelService);
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map