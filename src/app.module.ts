import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';
import { ScheduleService } from './schedule/schedule.service';
import { TelegramController } from './telegram/telegram.controller';
import { CurrencyService } from './currency/currency.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, TelegramController],
  providers: [AppService, TelegramService, ScheduleService, CurrencyService],
})
export class AppModule {}
