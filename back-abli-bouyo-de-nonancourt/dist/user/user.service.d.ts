import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserDao } from './dao/user.dao';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly _userDao;
    private readonly _logger;
    constructor(_userDao: UserDao, _logger: Logger);
    findAll(): Observable<UserEntity[] | void>;
    findOne(id: string): Observable<UserEntity>;
    findByLogin(loginUser: string): Observable<UserEntity>;
    create(user: CreateUserDto): Observable<UserEntity>;
    delete(id: string): Observable<void>;
    update(id: string, user: UpdateUserDto): Observable<UserEntity>;
    tryToUpdate(id: string, user: UpdateUserDto): Observable<UserEntity>;
    private _addUser;
}
