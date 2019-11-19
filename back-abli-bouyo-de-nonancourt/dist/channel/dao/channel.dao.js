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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const message_entity_1 = require("../entities/message.entity");
let ChannelDao = class ChannelDao {
    constructor(_channelModel, _messageModel, _logger) {
        this._channelModel = _channelModel;
        this._messageModel = _messageModel;
        this._logger = _logger;
    }
    findAllChannels() {
        return rxjs_1.from(this._channelModel.find({}))
            .pipe(operators_1.map((docs) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined));
    }
    findChannelById(id) {
        return rxjs_1.from(this._channelModel.findById(id))
            .pipe(operators_1.map((doc) => !!doc ? doc.toJSON() : undefined));
    }
    findChannelByIdChannel(id) {
        return rxjs_1.from(this._channelModel.findOne({ idChannel: id }))
            .pipe(operators_1.map((doc) => !!doc ? doc.toJSON() : undefined));
    }
    findSubscribedChannelsOfUser(id) {
        return rxjs_1.from(this._channelModel.find({ usersSubscribed: { $in: id } }))
            .pipe(operators_1.map((docs) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined));
    }
    async findMessagesOnChannel(query) {
        var e_1, _a;
        let i = 0;
        let nb = 0;
        let res = [];
        let tmp;
        try {
            for (var _b = __asyncValues(await this._messageModel.find({ idChannel: query.idChannel })), _c; _c = await _b.next(), !_c.done;) {
                const message = _c.value;
                this._logger.log(` ${i}`);
                if (query.threshold == -1 || (nb < query.threshold && i + 1 >= query.startingAt)) {
                    tmp = new message_entity_1.MessageEntity(message);
                    tmp.fillData(message.get('_id'), message.get('content'), message.get('idUser'), message.get('date'));
                    res = res.concat(tmp);
                    this._logger.log(`AYYYYY2222 ${i} ${tmp}`);
                    nb++;
                }
                i++;
                this._logger.log(`lool ${res} , ${i}, ${nb}`);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._logger.log(`AYYYYY2222 ${res} , ${i}, ${nb}`);
        return res;
    }
    createChannel(channel) {
        return rxjs_1.from(this._channelModel.create(channel))
            .pipe(operators_1.map((doc) => doc.toJSON()));
    }
    findChannelByIdAndRemove(id) {
        return rxjs_1.from(this._channelModel.findByIdAndRemove(id))
            .pipe(operators_1.map((doc) => !!doc ? doc.toJSON() : undefined));
    }
    subscribe(sub) {
        return rxjs_1.from(this._channelModel.findOneAndUpdate({ _id: sub.idChannel, usersSubscribed: { $nin: sub.idUser } }, { $push: { usersSubscribed: sub.idUser } }))
            .pipe(operators_1.map((doc) => !!doc ? doc.toJSON() : undefined));
    }
    unsubscribe(sub) {
        return rxjs_1.from(this._channelModel.findOneAndUpdate({ _id: sub.idChannel, usersSubscribed: { $in: sub.idUser } }, { $pull: { usersSubscribed: sub.idUser } }))
            .pipe(operators_1.map((doc) => !!doc ? doc.toJSON() : undefined));
    }
    tryToDeleteChannel(id) {
        return rxjs_1.from(this._channelModel.findOneAndDelete({ _id: id, usersSubscribed: { $size: 0 } }))
            .pipe(operators_1.map((doc) => !!doc ? doc.toJSON() : undefined));
    }
    existsWithId(id) {
        return rxjs_1.from(this._channelModel.exists({ _id: id }));
    }
    _addDateToMessage(message) {
        return rxjs_1.of(message)
            .pipe(operators_1.map(_ => Object.assign(_, {
            date: Date.now(),
        })));
    }
    writeIntoChannel(message) {
        return this._addDateToMessage(message)
            .pipe(operators_1.flatMap(_ => this._messageModel.create(_)), operators_1.catchError(e => e.code = 11000 ?
            rxjs_1.throwError(new common_1.ConflictException(`Message can't be created.`)) :
            rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.map(_ => new message_entity_1.MessageEntity(_)));
    }
};
ChannelDao = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Channel')),
    __param(1, mongoose_1.InjectModel('Message')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_1.Logger])
], ChannelDao);
exports.ChannelDao = ChannelDao;
//# sourceMappingURL=channel.dao.js.map