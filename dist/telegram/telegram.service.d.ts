import { ScheduleService } from '../schedule/schedule.service';
export declare class TelegramService {
    private schedule;
    private readonly telegramBot;
    private readonly webhookUrl;
    constructor(schedule: ScheduleService);
    private getNextLesson;
}
