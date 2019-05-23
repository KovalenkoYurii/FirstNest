import { ScheduleService } from '../schedule/schedule.service';
import { CurrencyService } from 'src/currency/currency.service';
export declare class TelegramService {
    private schedule;
    private currency;
    private readonly defaultUrl;
    private readonly scheduleBot;
    private readonly currencyBot;
    private readonly scheduleWebhook;
    private readonly currencyWebhook;
    private readonly groupRegex;
    private readonly currencyRegex;
    private readonly scheduleToken;
    private readonly currencyToken;
    constructor(schedule: ScheduleService, currency: CurrencyService);
    handleScheduleMessage(chatId: number, text: string): void;
    private getNextLesson;
    handleCurrencyMessage(chatId: number, text: string): void;
    private getCurrency;
}
