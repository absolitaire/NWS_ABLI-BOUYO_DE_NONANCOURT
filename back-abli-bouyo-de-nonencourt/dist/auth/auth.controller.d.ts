import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HandlerParams } from './validator/handler-params';
export declare class AuthController {
    private readonly _authService;
    private readonly _logger;
    constructor(_authService: AuthService, _logger: Logger);
    login(body: HandlerParams): Promise<any>;
}
