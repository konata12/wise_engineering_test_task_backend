import { Injectable } from '@nestjs/common';
import { CreateOutdoorActivityDto } from './dto/create-outdoor_activity.dto';
import { UpdateOutdoorActivityDto } from './dto/update-outdoor_activity.dto';

@Injectable()
export class OutdoorActivityService {
  create(createOutdoorActivityDto: CreateOutdoorActivityDto) {
    return 'This action adds a new outdoorActivity';
  }

  findAll() {
    return `This action returns all outdoorActivity`;
  }
}
