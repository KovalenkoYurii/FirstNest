import { Request } from 'express';
import { TelegramService } from './telegram.service';
export declare class TelegramController {
    private telegram;
    constructor(telegram: TelegramService);
    getSchedule(request: Request): void;
    getCurrency(request: Request): void;
}
