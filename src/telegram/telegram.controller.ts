import { Controller, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private telegram: TelegramService) {}
  @Post('schedule')
  getSchedule(@Req() request: Request) {
    const {
      chat: { id, text },
    } = request.body;
    this.telegram.handleMessage(id, text);
  }
}
