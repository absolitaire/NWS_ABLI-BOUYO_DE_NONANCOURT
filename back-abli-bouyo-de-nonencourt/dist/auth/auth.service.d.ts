import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly _logger;
    constructor(userService: UserService, _logger: Logger);
    validateUser(username: string, pass: string): Promise<any>;
}
