import { AppService } from './app.service';
import { Request } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    get(request: Request): void;
    post(request: Request): void;
    getSchedule(request: Request): void;
    postSchedule(request: Request): void;
}
