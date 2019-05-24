import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ScheduleService } from '../schedule/schedule.service';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class TelegramService {
  private readonly defaultUrl =
    'https://awesome-nest-project-develop.herokuapp.com';
  private readonly scheduleBot: TelegramBot;
  private readonly currencyBot: TelegramBot;
  private readonly scheduleWebhook: string;
  private readonly currencyWebhook: string;
  private readonly scheduleToken: string;
  private readonly currencyToken: string;

  constructor(
    private schedule: ScheduleService,
    private currency: CurrencyService,
  ) {
    this.scheduleWebhook = `${process.env.APP_URL ||
      this.defaultUrl}/telegram/schedule`;
    this.scheduleToken =
      process.env.SCHEDULE_BOT || 'no scheduleToken provided';
    this.scheduleBot = new TelegramBot(this.scheduleToken);
    this.scheduleBot.setWebHook(this.scheduleWebhook);
    this.currencyWebhook = `${process.env.APP_URL ||
      this.defaultUrl}/telegram/currency`;
    this.currencyToken =
      process.env.CURRENCY_BOT || 'no currencyToken provided';
    this.currencyBot = new TelegramBot(this.currencyToken);
    this.currencyBot.setWebHook(this.currencyWebhook);
  }

  public handleScheduleMessage(chatId: number, text: string) {
    this.schedule
      .getNextLessonForGroup(text)
      .then(
        nextLesson => this.scheduleBot.sendMessage(chatId, nextLesson),
        _ => this.scheduleBot.sendMessage(chatId, 'not found'),
      );
  }

  public handleCurrencyMessage(chatId: number, text: string) {
    this.currency
      .getCurrency(text)
      .then(
        currency => this.currencyBot.sendMessage(chatId, currency),
        _ => this.currencyBot.sendMessage(chatId, 'error'),
      );
  }
}
