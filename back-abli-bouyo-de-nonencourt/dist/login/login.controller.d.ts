import { LoginService } from './login.service';
import { UserEntity } from '../user/entities/user.entity';
import { Observable } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
export declare class LoginController {
    private readonly _loginService;
    constructor(_loginService: LoginService);
    login(loginUserDto: LoginUserDto): Observable<UserEntity>;
}
