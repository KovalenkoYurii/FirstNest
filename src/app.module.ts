import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, TelegramService, ScheduleService],
})
export class AppModule {}
