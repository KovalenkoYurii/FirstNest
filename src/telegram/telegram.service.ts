import { Injectable } from '@nestjs/common';
import { TelegramConfig } from './telegram.config';
import * as TelegramBot from 'node-telegram-bot-api';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class TelegramService {
  private readonly telegramBot: TelegramBot;
  constructor(private schedule: ScheduleService) {
    const token = TelegramConfig.apiKey;
    this.telegramBot = new TelegramBot(token, { polling: true });
    this.telegramBot.onText(/[А-я|і]*-[\d]*/g, (msg, match) => {
      this.getNextLesson(msg.text).then(nextLesson =>
        this.telegramBot.sendMessage(msg.chat.id, nextLesson),
      );
    });
  }
  private getNextLesson(groupName: string) {
    return this.schedule.getNextLessonForGroup(groupName);
  }
}
