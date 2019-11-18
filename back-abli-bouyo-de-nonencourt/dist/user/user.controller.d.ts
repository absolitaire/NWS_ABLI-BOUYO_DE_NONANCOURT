import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly _userService;
    constructor(_userService: UserService);
    findAll(): Observable<UserEntity[] | void>;
    findOne(params: HandlerParams): Observable<UserEntity>;
    create(createUserDto: CreateUserDto): Observable<UserEntity>;
    delete(params: HandlerParams): Observable<void>;
    update(params: HandlerParams, updateUserDto: UpdateUserDto): Observable<UserEntity>;
}
