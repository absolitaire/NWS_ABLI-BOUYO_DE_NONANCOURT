import { UserEntity } from '../user/entities/user.entity';
import { UserDao } from '../user/dao/user.dao';
import { Observable } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
export declare class LoginService {
    private readonly _userDao;
    constructor(_userDao: UserDao);
    login(login: LoginUserDto): Observable<UserEntity>;
}
