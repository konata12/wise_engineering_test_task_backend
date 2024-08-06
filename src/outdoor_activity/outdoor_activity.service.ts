import { Injectable } from '@nestjs/common';
import { CreateOutdoorActivityDto } from './dto/create-outdoor_activity.dto';
import { UpdateOutdoorActivityDto } from './dto/update-outdoor_activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/typeorm/entities/Activity';
import { Repository } from 'typeorm';

@Injectable()
export class OutdoorActivityService {

  constructor(
    @InjectRepository(Activity) private activityRepository: Repository<Activity>
  ) {}

  createActivity(createOutdoorActivityDto: CreateOutdoorActivityDto) {
    return 'This action adds a new outdoorActivity';
  }

  findAllActivities() {
    return `This action returns all outdoorActivity`;
  }
}
