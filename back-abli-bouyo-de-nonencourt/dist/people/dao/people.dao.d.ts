import { Model } from 'mongoose';
import { Person } from '../interfaces/person.interface';
import { Observable } from 'rxjs';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { CreatePersonDto } from '../dto/create-person.dto';
export declare class PeopleDao {
    private readonly _personModel;
    constructor(_personModel: Model<Person>);
    find(): Observable<Person[] | void>;
    findById(id: string): Observable<Person | void>;
    create(person: CreatePersonDto): Observable<Person>;
    findByIdAndUpdate(id: string, person: UpdatePersonDto): Observable<Person | void>;
    findByIdAndRemove(id: string): Observable<Person | void>;
}
