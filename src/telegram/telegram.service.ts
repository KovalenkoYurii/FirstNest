import { Injectable } from '@nestjs/common';
import { TelegramConfig } from './telegram.config';
import * as TelegramBot from 'node-telegram-bot-api';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class TelegramService {
  private readonly telegramBot: TelegramBot;
  private readonly webhookUrl: string = `${
    process.env.APP_URL || 'https://awesome-nest-project-develop.herokuapp.com'
  }/telegram/schedule`;
  constructor(private schedule: ScheduleService) {
    const token = TelegramConfig.apiKey;
    this.telegramBot = new TelegramBot(token);
    this.telegramBot.setWebHook(this.webhookUrl);
// tslint:disable-next-line: no-console
    console.log(this.webhookUrl);
    // this.telegramBot.onText(/[А-я|і]*-[\d]*/g, msg => {
    //   this.getNextLesson(msg.text).then(
    //     nextLesson => this.telegramBot.sendMessage(msg.chat.id, nextLesson),
    //     _ => this.telegramBot.sendMessage(msg.chat.id, 'kuku'),
    //   );
    // });
  }

  private getNextLesson(groupName: string) {
    return this.schedule.getNextLessonForGroup(groupName);
  }
}
