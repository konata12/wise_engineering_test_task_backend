import { Module } from '@nestjs/common';
import { OutdoorActivityService } from './outdoor_activity.service';
import { OutdoorActivityController } from './outdoor_activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/typeorm/entities/Activity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [OutdoorActivityController],
  providers: [OutdoorActivityService],
})
export class OutdoorActivityModule {}
