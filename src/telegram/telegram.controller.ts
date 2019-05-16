import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('telegram')
export class TelegramController {
  @Get('scedule')
  getSchedule(@Req() request: Request) {
    console.log(request);
  }
}
