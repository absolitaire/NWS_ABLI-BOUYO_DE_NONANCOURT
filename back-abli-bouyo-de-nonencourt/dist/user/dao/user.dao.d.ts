import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UserDao {
    private readonly _userModel;
    constructor(_userModel: Model<User>);
    find(): Observable<User[] | void>;
    findById(id: string): Observable<User | void>;
    create(user: CreateUserDto): Observable<User>;
    findByIdAndRemove(id: string): Observable<User | void>;
}
