import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserDao } from './dao/user.dao';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateMessageDto } from '../channel/dto/create-message.dto';
import { ChannelEntity } from '../channel/entities/channel.entity';

@Injectable()
export class UserService {

  /**
   * Class constructor
   *
   * @param {UserDao} _userDao instance of the DAO
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
   * Returns one user of the list matching login in parameter
   *
   * @param {string} login of the user
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
   * Update a user in user list
   *
   * @param {string} id of the user to update
   * @param user data to update
   *
   * @returns {Observable<UserEntity>}
   */
  update(id: string, user: UpdateUserDto): Observable<UserEntity> {
    return this._userDao.findByIdAndUpdate(id, user)
      .pipe(
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`User already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        flatMap(_ =>
          !!_ ?
            of(new UserEntity((_))) :
            throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }
  tryToUpdate(id: string, user: UpdateUserDto): Observable<UserEntity> {
    if(!!user.login){
      return this._userDao.findByLogin(user.login)
        .pipe(
          catchError(e => throwError(new NotFoundException(e.message))),
          flatMap(_ =>
            !!_ ?
              throwError(new ConflictException(`User with login '${user.login}' doesn't exist`)):
              // throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
              // throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
              // throwError(new ConflictException(`Channel with id '${message.idChannel}' doesn't exist`)),
           this.update(id, user)
          ),
        );
    }


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
