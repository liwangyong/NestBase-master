import { Module, Global } from '@nestjs/common';
import { ScheduleModule } from 'nest-schedule';
import { ScheduleService } from '../services/schedule-service'
@Global()
@Module({
  imports: [
    ScheduleModule.register(),
  ],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModules {
}
