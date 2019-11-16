import { Observable } from 'rxjs';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonEntity } from './entities/person.entity';
import { PeopleDao } from './dao/people.dao';
export declare class PeopleService {
    private readonly _peopleDao;
    constructor(_peopleDao: PeopleDao);
    findAll(): Observable<PersonEntity[] | void>;
    findRandom(): Observable<PersonEntity | void>;
    findOne(id: string): Observable<PersonEntity>;
    create(person: CreatePersonDto): Observable<PersonEntity>;
    update(id: string, person: UpdatePersonDto): Observable<PersonEntity>;
    delete(id: string): Observable<void>;
    private _addPerson;
    private _parseDate;
}
