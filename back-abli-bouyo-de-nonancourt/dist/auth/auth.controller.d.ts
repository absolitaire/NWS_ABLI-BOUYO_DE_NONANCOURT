import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly _authService;
    private readonly _logger;
    constructor(_authService: AuthService, _logger: Logger);
    login(body: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
