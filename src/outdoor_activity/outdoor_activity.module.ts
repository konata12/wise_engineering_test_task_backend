import { Module } from '@nestjs/common';
import { OutdoorActivityService } from './outdoor_activity.service';
import { OutdoorActivityController } from './outdoor_activity.controller';

@Module({
  controllers: [OutdoorActivityController],
  providers: [OutdoorActivityService],
})
export class OutdoorActivityModule {}
