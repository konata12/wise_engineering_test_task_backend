import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { OutdoorActivityService } from './outdoor_activity.service';
import { CreateOutdoorActivityDto } from './dto/create-outdoor_activity.dto';

@Controller('outdoor-activity')
export class OutdoorActivityController {
  constructor(private readonly outdoorActivityService: OutdoorActivityService) { }

  @Post()
  create(@Body(new ValidationPipe()) createOutdoorActivityDto: CreateOutdoorActivityDto) {
    return this.outdoorActivityService.createActivity(createOutdoorActivityDto);
  }

  @Get()
  async findAll() {
    const [
      activities,
      longestRun,
      longestRide,
      totalRunDistance,
      totalRideDistance
    ] = await Promise.all([
      this.outdoorActivityService.findAllActivities(),
      this.outdoorActivityService.findLongestActivity('run'),
      this.outdoorActivityService.findLongestActivity('ride'),
      this.outdoorActivityService.getTotalActivityDistance('run'),
      this.outdoorActivityService.getTotalActivityDistance('ride')
    ])

    return {
      activities,
      longestRun,
      longestRide,
      totalRunDistance,
      totalRideDistance
    }
  }
}
