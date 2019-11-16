import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { Person } from '../interfaces/person.interface';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { CreatePersonDto } from '../dto/create-person.dto';

@Injectable()
export class PeopleDao {
  /**
   * Class constructor
   *
   * @param {Model<Person>} _personModel instance of the model representing a Person
   */
  constructor(@InjectModel('Person') private readonly _personModel: Model<Person>) {
  }

  /**
   * Call mongoose method, call toJSON on each result and returns Person[] or undefined
   *
   * @return {Observable<Person[] | void>}
   */
  find(): Observable<Person[] | void> {
    return from(this._personModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  /**
   * Returns one person of the list matching id in parameter
   *
   * @param {string} id of the person in the db
   *
   * @return {Observable<Person | void>}
   */
  findById(id: string): Observable<Person | void> {
    return from(this._personModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Check if person already exists with index and add it in people list
   *
   * @param {Person} person to create
   *
   * @return {Observable<CreatePersonDto>}
   */
  create(person: CreatePersonDto): Observable<Person> {
    return from(this._personModel.create(person))
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  /**
   * Update a person in people list
   *
   * @param {string} id
   * @param {UpdatePersonDto} person
   *
   * @return {Observable<Person | void>}
   */
  findByIdAndUpdate(id: string, person: UpdatePersonDto): Observable<Person | void> {
    return from(this._personModel.findByIdAndUpdate(id, person, { new: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Delete a person in people list
   *
   * @param {string} id
   *
   * @return {Observable<Person | void>}
   */
  findByIdAndRemove(id: string): Observable<Person | void> {
    return from(this._personModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
