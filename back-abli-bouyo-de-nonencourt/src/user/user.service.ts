import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserDao } from './dao/user.dao';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {

  /**
   * Class constructor
   *
   * @param {PeopleDao} _userDao instance of the DAO
   */
  constructor(private readonly _userDao: UserDao) {}

  /**
   * Returns all existing user in the list
   *
   * @returns {Observable<UserEntity[] | void>}
   */
  findAll(): Observable<UserEntity[] | void> {
    return this._userDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new UserEntity(__)) : undefined),
      );
  }
  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   *
   * @returns {Observable<UserEntity>}
   */
  findOne(id: string): Observable<UserEntity> {
    return this._userDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   *
   * @returns {Observable<UserEntity>}
   */
  findByLogin(loginUser: string): Observable<UserEntity> {
    return this._userDao.findByLogin(loginUser)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`User with login '${loginUser}' not found`)),
        ),
      );
  }

  /**
   * Check if user already exists and add it in user list
   *
   * @param user to create
   *
   * @returns {Observable<UserEntity>}
   */
  create(user: CreateUserDto): Observable<UserEntity> {
    return this._addUser(user)
      .pipe(
        flatMap(_ => this._userDao.create(_)),
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`User already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new UserEntity(_)),
      );
  }

  /**
   * Deletes one user in user list
   *
   * @param {string} id of the user to delete
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._userDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Add user with good data in user list
   *
   * @param user to add
   *
   * @returns {Observable<CreateUserDto>}
   *
   * @private
   */
  private _addUser(user: CreateUserDto): Observable<CreateUserDto> {
    return of(user);
  }

}
