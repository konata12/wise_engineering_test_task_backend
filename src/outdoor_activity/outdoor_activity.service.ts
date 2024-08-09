import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/typeorm/entities/Activity';
import { Repository } from 'typeorm';
import { ActivityType, CreateActivitiesParams, Month, ParseActivityToResponse, ParsedActivity, ParsedDate, ParsedTime } from 'src/utils/types';
import { Months } from 'src/utils/month.enum';

@Injectable()
export class OutdoorActivityService {

  constructor(
    @InjectRepository(Activity) private activityRepository: Repository<Activity>
  ) { }

  createActivity(activityDetails: CreateActivitiesParams) {
    const { startTime, finishTime, activityType } = activityDetails
    const activityDistance = this.parseNumberToFixedOne(activityDetails.activityDistance)
    const newActivity = this.activityRepository.create({
      date: new Date(),
      startTime,
      finishTime,
      activityDistance,
      activityType
    })

    console.log(activityDistance)

    return this.activityRepository.save(newActivity)
  }

  async findAllActivities(): Promise<ParsedActivity[]> {
    const activities = await this.activityRepository.find()
    const parsedActivities = activities.map((activity) => {
      return this.parseResponseObject(activity)
    })

    return parsedActivities
  }

  async findLongestActivity(activityType: ActivityType): Promise<ParsedActivity> {
    const longestActivity = await this.activityRepository.findOne({
      order: {
        activityDistance: "DESC"
      },
      where: {
        activityType: activityType
      }
    })

    const parsedLongestActivity = this.parseResponseObject(longestActivity)
    return parsedLongestActivity
  }

  getTotalActivityDistance(activityType: ActivityType) {
    return this.activityRepository.sum(
      'activityDistance',
      {
        activityType: activityType
      }
    )
  }

  parseResponseObject(activity: ParseActivityToResponse): ParsedActivity {
    const date = this.parseDate(activity.date)
    const distance = this.parseNumberToFixed(+activity.activityDistance)
    const time = this.parseTime(activity.startTime, activity.finishTime)
    const speed = this.getSpeed(activity.activityDistance, activity.startTime, activity.finishTime)

    return {
      date,
      activityType: activity.activityType,
      distance,
      time,
      speed
    }
  }

  parseDate(date: Date): ParsedDate {
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const month = this.parseMonth(monthIndex)

    return {
      day,
      month
    }
  }

  parseMonth(monthIndex: number): Month {
    return Months[monthIndex]
  }

  parseTime(startTime: string, finishTime: string): ParsedTime {
    const timeInMinutes = this.getTimeDifferenceInMinutes(startTime, finishTime)
    const hours = Math.floor(timeInMinutes / 60)
    const minutes = timeInMinutes % 60

    return {
      hours,
      minutes
    }
  }

  getTimeDifferenceInMinutes(startTime: string, finishTime: string): number {
    const startDate = Date.parse(`2000-01-01T${startTime}:00`)
    const finishDate = Date.parse(`2000-01-01T${finishTime}:00`)
    return (finishDate - startDate) / 1000 / 60
  }

  getSpeed(distance: number, startTime: string, finishTime: string): number {
    const timeInMinutes = this.getTimeDifferenceInMinutes(startTime, finishTime)
    const speed = +distance / timeInMinutes * 60
    const parsedSpeed = this.parseNumberToFixed(speed)

    return parsedSpeed
  }

  parseNumberToFixed(number: number): number {
    const parsedNumber = +number.toFixed(1) === +number.toFixed(0) ?
      +number.toFixed(0) :
      +number.toFixed(1)

    return parsedNumber
  }

  parseNumberToFixedOne(number: number): number {
    return +number.toFixed(1)
  }
}
