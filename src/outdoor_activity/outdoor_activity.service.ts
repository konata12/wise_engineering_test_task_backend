import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const { startTime, finishTime, activityType } = activityDetails
      const activityDistance = this.parseNumberToFixedOne(activityDetails.activityDistance)
      const newActivity = this.activityRepository.create({
        date: new Date(),
        startTime,
        finishTime,
        activityDistance,
        activityType
      })

      return this.activityRepository.save(newActivity)
    } catch (error) {
      throw new InternalServerErrorException('Failed to create activity')
    }
  }

  async findAllActivities(): Promise<ParsedActivity[]> {
    try {
      const activities = await this.activityRepository.find()
      const parsedActivities = activities.map((activity, i) => {
        return this.parseResponseObject(activity)
      })

      return parsedActivities
    } catch (error) {
      throw new InternalServerErrorException('Failed to get all activities')
    }
  }

  async findLongestActivity(activityType: ActivityType): Promise<ParsedActivity | null> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get longest ${activityType}`)
    }
  }

  getTotalActivityDistance(activityType: ActivityType) {
    try {
      return this.activityRepository.sum(
        'activityDistance',
        {
          activityType: activityType
        }
      )
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get total ${activityType} distance`)
    }
  }

  parseResponseObject(activity: ParseActivityToResponse | null): ParsedActivity | null {
    try {
      // if there aren't ride or run activities in databes  don't return record activity of this type
      if (activity === null) return null

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
    } catch (error) {
      throw new InternalServerErrorException(`Failed to parse activity to response object`)
    }
  }

  parseDate(date: Date): ParsedDate {
    try {
      const day = date.getDate()
      const monthIndex = date.getMonth()
      const month = this.parseMonth(monthIndex)

      return {
        day,
        month
      }
    } catch (error) {
      throw new InternalServerErrorException(`Failed to parse activity date`)
    }
  }

  parseMonth(monthIndex: number): Month {
    try {
      return Months[monthIndex]
    } catch (error) {
      throw new InternalServerErrorException(`Failed to parse activity month`)
    }
  }

  parseTime(startTime: string, finishTime: string): ParsedTime {
    try {
      const timeInMinutes = this.getTimeDifferenceInMinutes(startTime, finishTime)
      const hours = Math.floor(timeInMinutes / 60)
      const minutes = timeInMinutes % 60

      return {
        hours,
        minutes
      }
    } catch (error) {
      throw new InternalServerErrorException(`Failed to parse activity time`)
    }
  }

  getTimeDifferenceInMinutes(startTime: string, finishTime: string): number {
    try {
      const startDate = Date.parse(`2000-01-01T${startTime}:00`)
      const finishDate = Date.parse(`2000-01-01T${finishTime}:00`)
      return (finishDate - startDate) / 1000 / 60
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get time difference in minutes`)
    }
  }

  getSpeed(distance: number, startTime: string, finishTime: string): number {
    try {
      const timeInMinutes = this.getTimeDifferenceInMinutes(startTime, finishTime)
      const speed = +distance / timeInMinutes * 60
      const parsedSpeed = this.parseNumberToFixed(speed)

      return parsedSpeed
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get activity speed`)
    }
  }

  parseNumberToFixed(number: number): number {
    try {
      const parsedNumber = +number.toFixed(1) === +number.toFixed(0) ?
        +number.toFixed(0) :
        +number.toFixed(1)

      return parsedNumber
    } catch (error) {
      throw new InternalServerErrorException('Failed to parse number to fixed')
    }
  }

  parseNumberToFixedOne(number: number): number {
    try {
      return +number.toFixed(1)
    } catch (error) {
      throw new InternalServerErrorException('Failed to parse number to fixed 1')
    }
  }
}
