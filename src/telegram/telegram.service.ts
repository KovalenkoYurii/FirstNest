import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ScheduleService } from '../schedule/schedule.service';
import { CurrencyService } from 'src/currency/currency.service';

@Injectable()
export class TelegramService {
  private readonly defaultUrl =
    'https://awesome-nest-project-develop.herokuapp.com';
  private readonly scheduleBot: TelegramBot;
  private readonly currencyBot: TelegramBot;
  private readonly scheduleWebhook: string;
  private readonly currencyWebhook: string;
  private readonly groupRegex: RegExp;
  private readonly currencyRegex: RegExp;
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
    this.groupRegex = /[А-я|і]*-[\d]*/gi;
    this.currencyRegex = /^(usd|eur)$/gi;
    this.currencyWebhook = `${process.env.APP_URL ||
      this.defaultUrl}/telegram/currency`;
    this.currencyToken =
      process.env.CURRENCY_BOT || 'no currencyToken provided';
    this.currencyBot = new TelegramBot(this.currencyToken);
    this.currencyBot.setWebHook(this.currencyWebhook);
  }

  public handleScheduleMessage(chatId: number, text: string) {
    if (this.groupRegex.test(text)) {
      this.getNextLesson(text).then(
        nextLesson => this.scheduleBot.sendMessage(chatId, nextLesson),
        _ => this.scheduleBot.sendMessage(chatId, 'not found'),
      );
    } else {
      this.scheduleBot.sendMessage(chatId, 'wrong');
    }
  }

  private getNextLesson(groupName: string) {
    return this.schedule.getNextLessonForGroup(groupName);
  }

  public handleCurrencyMessage(chatId: number, text: string) {
    if (this.currencyRegex.test(text)) {
      this.getCurrency(text).then(
        course => this.currencyBot.sendMessage(chatId, course),
        _ => this.currencyBot.sendMessage(chatId, 'error'),
      );
    } else {
      this.currencyBot.sendMessage(chatId, 'wrong currency');
    }
  }

  private getCurrency(currencyCode: string) {
    return this.currency.getCurrency(currencyCode);
  }
}
