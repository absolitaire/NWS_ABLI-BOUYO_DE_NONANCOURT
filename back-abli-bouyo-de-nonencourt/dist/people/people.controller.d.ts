import { PeopleService } from './people.service';
import { Observable } from 'rxjs';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { HandlerParams } from './validators/handler-params';
import { PersonEntity } from './entities/person.entity';
export declare class PeopleController {
    private readonly _peopleService;
    constructor(_peopleService: PeopleService);
    findAll(): Observable<PersonEntity[] | void>;
    findRandom(): Observable<PersonEntity | void>;
    findOne(params: HandlerParams): Observable<PersonEntity>;
    create(createPersonDto: CreatePersonDto): Observable<PersonEntity>;
    update(params: HandlerParams, updatePersonDto: UpdatePersonDto): Observable<PersonEntity>;
    delete(params: HandlerParams): Observable<void>;
}
