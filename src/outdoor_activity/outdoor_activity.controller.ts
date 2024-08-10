import { Controller, Get, Post, Body, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { OutdoorActivityService } from './outdoor_activity.service';
import { CreateOutdoorActivityDto } from './dto/create-outdoor_activity.dto';

@Controller('outdoor-activity')
export class OutdoorActivityController {
  constructor(private readonly outdoorActivityService: OutdoorActivityService) { }

  @Post()
  async create(@Body(new ValidationPipe()) createOutdoorActivityDto: CreateOutdoorActivityDto) {
    try {
      return await this.outdoorActivityService.createActivity(createOutdoorActivityDto);
    } catch (error) {
      throw new HttpException('Failed to create activity', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
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
      ]);

      return {
        activities,
        longestRun,
        longestRide,
        totalRunDistance,
        totalRideDistance
      };
    } catch (error) {
      throw new HttpException('Failed to retrieve activities', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
