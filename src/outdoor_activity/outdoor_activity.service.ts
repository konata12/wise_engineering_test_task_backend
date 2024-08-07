import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/typeorm/entities/Activity';
import { Repository } from 'typeorm';
import { ActivityType, CreateActivitiesParams } from 'src/utils/types';

@Injectable()
export class OutdoorActivityService {

  constructor(
    @InjectRepository(Activity) private activityRepository: Repository<Activity>
  ) {}

  createActivity(activityDetails: CreateActivitiesParams) {
    const newActivity = this.activityRepository.create({
      ...activityDetails,
      date: new Date()
    })

    return this.activityRepository.save(newActivity)
  }

  findAllActivities() {
    return this.activityRepository.find()
  }

  findLongestActivity(activityType: ActivityType) {
    return this.activityRepository.findOne({
      order: {
        activityDistance: "DESC"
      },
      where: {
        activityType: activityType
      }
    })
  }

  getTotalActivityDistance(activityType: ActivityType) {
    return this.activityRepository.sum(
      'activityDistance',
      {
        activityType: activityType
      }
    )
  }
}
