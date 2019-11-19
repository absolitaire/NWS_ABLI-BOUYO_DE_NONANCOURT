import { BackService } from './back.service';
export declare class BackController {
    private readonly backService;
    constructor(backService: BackService);
    getHello(): string;
}
