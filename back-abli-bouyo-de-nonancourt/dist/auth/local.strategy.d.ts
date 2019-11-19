import { Strategy } from 'passport-local';
import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
declare const LocalStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    private readonly _logger;
    constructor(authService: AuthService, _logger: Logger);
    validate(username: string, password: string): Promise<any>;
}
export {};
