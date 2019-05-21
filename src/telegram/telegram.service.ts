import { Injectable } from '@nestjs/common';
import { TelegramConfig } from './telegram.config';
import * as TelegramBot from 'node-telegram-bot-api';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class TelegramService {
  private readonly telegramBot: TelegramBot;
  private readonly webhookUrl: string;
  constructor(private schedule: ScheduleService) {
// tslint:disable-next-line: no-console
    console.log(process.env);
    this.webhookUrl = `${process.env.APP_URL ||
      'https://awesome-nest-project-develop.herokuapp.com'}/telegram/schedule`;
    const token = TelegramConfig.apiKey;
    this.telegramBot = new TelegramBot(token);
    this.telegramBot.setWebHook(this.webhookUrl);
  }

  public async handleMessage(chatId: number, text: string) {
    const regex = /[А-я|і]*-[\d]*/g;
    if (regex.test(text)) {
      const nextLesson = await this.getNextLesson(text);
      this.telegramBot.sendMessage(chatId, nextLesson);
    } else {
      this.telegramBot.sendMessage(chatId, 'bye');
    }
  }

  private getNextLesson(groupName: string) {
    return this.schedule.getNextLessonForGroup(groupName);
  }
}
