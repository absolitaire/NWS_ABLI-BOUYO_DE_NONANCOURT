import { Observable } from 'rxjs';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserDao } from './dao/user.dao';
export declare class UserService {
    private readonly _userDao;
    constructor(_userDao: UserDao);
    findAll(): Observable<UserEntity[] | void>;
    findOne(id: string): Observable<UserEntity>;
    create(user: CreateUserDto): Observable<UserEntity>;
    delete(id: string): Observable<void>;
    private _addUser;
}
