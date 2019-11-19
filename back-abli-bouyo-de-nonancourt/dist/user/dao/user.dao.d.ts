import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserDao {
    private readonly _userModel;
    constructor(_userModel: Model<User>);
    find(): Observable<User[] | void>;
    findById(id: string): Observable<User | void>;
    findByLogin(loginUser: string): Observable<User | any>;
    create(user: CreateUserDto): Observable<User>;
    findByIdAndUpdate(id: string, user: UpdateUserDto): Observable<User | void>;
    findByIdAndRemove(id: string): Observable<User | void>;
}
