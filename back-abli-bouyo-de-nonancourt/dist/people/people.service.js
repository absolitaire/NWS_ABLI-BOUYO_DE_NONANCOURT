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
const operators_1 = require("rxjs/operators");
const person_entity_1 = require("./entities/person.entity");
const people_dao_1 = require("./dao/people.dao");
let PeopleService = class PeopleService {
    constructor(_peopleDao) {
        this._peopleDao = _peopleDao;
    }
    findAll() {
        return this._peopleDao.find()
            .pipe(operators_1.map(_ => !!_ ? _.map(__ => new person_entity_1.PersonEntity(__)) : undefined));
    }
    findRandom() {
        return this._peopleDao.find()
            .pipe(operators_1.map(_ => !!_ ? _[Math.round(Math.random() * _.length)] : undefined), operators_1.map(_ => !!_ ? new person_entity_1.PersonEntity(_) : undefined));
    }
    findOne(id) {
        return this._peopleDao.findById(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(new person_entity_1.PersonEntity(_)) :
            rxjs_1.throwError(new common_1.NotFoundException(`Person with id '${id}' not found`))));
    }
    create(person) {
        return this._addPerson(person)
            .pipe(operators_1.flatMap(_ => this._peopleDao.create(_)), operators_1.catchError(e => e.code = 11000 ?
            rxjs_1.throwError(new common_1.ConflictException(`Person with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`)) :
            rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.map(_ => new person_entity_1.PersonEntity(_)));
    }
    update(id, person) {
        return this._peopleDao.findByIdAndUpdate(id, person)
            .pipe(operators_1.catchError(e => e.code = 11000 ?
            rxjs_1.throwError(new common_1.ConflictException(`Person with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`)) :
            rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(new person_entity_1.PersonEntity((_))) :
            rxjs_1.throwError(new common_1.NotFoundException(`Person with id '${id}' not found`))));
    }
    delete(id) {
        return this._peopleDao.findByIdAndRemove(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(undefined) :
            rxjs_1.throwError(new common_1.NotFoundException(`Person with id '${id}' not found`))));
    }
    _addPerson(person) {
        return rxjs_1.of(person)
            .pipe(operators_1.map(_ => Object.assign(_, {
            birthDate: this._parseDate('20/10/1990'),
            photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        })));
    }
    _parseDate(date) {
        const dates = date.split('/');
        return (new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime());
    }
};
PeopleService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [people_dao_1.PeopleDao])
], PeopleService);
exports.PeopleService = PeopleService;
//# sourceMappingURL=people.service.js.map