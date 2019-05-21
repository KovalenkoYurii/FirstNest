import { Controller, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private telegram: TelegramService) {}
  @Post('schedule')
  getSchedule(@Req() request: Request) {
    // tslint:disable-next-line: no-console
    console.log(request.body.chat);
    const {
      message: {
        chat: { id, text },
      },
    } = request.body;
    this.telegram.handleMessage(id, text);
  }
}
