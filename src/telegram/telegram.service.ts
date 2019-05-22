import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class TelegramService {
  private readonly telegramBot: TelegramBot;
  private readonly webhookUrl: string;
  private readonly groupRegex: RegExp;
  private readonly token: string;

  constructor(private schedule: ScheduleService) {
    this.webhookUrl = `${process.env.APP_URL ||
      'https://awesome-nest-project-develop.herokuapp.com'}/telegram/schedule`;
    this.token = process.env.SCHEDULE_BOT || 'no token provided';
    this.telegramBot = new TelegramBot(this.token);
    this.telegramBot.setWebHook(this.webhookUrl);
  }

  public handleMessage(chatId: number, text: string) {
    if (this.groupRegex.test(text)) {
      this.getNextLesson(text).then(
        nextLesson => this.telegramBot.sendMessage(chatId, nextLesson),
        _ => this.telegramBot.sendMessage(chatId, 'not-found'),
      );
    } else {
      this.telegramBot.sendMessage(chatId, 'bye');
    }
  }

  private getNextLesson(groupName: string) {
    return this.schedule.getNextLessonForGroup(groupName);
  }
}
