import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OutdoorActivityService } from './outdoor_activity.service';
import { CreateOutdoorActivityDto } from './dto/create-outdoor_activity.dto';
import { UpdateOutdoorActivityDto } from './dto/update-outdoor_activity.dto';

@Controller('outdoor-activity')
export class OutdoorActivityController {
  constructor(private readonly outdoorActivityService: OutdoorActivityService) {}

  @Post()
  create(@Body() createOutdoorActivityDto: CreateOutdoorActivityDto) {
    console.log(new Date(createOutdoorActivityDto.date))
    return this.outdoorActivityService.create(createOutdoorActivityDto);
  }

  @Get()
  findAll() {
    const cc = new Date()
    console.log(new Date())
    console.log(typeof cc)
    return this.outdoorActivityService.findAll();
  }
}
