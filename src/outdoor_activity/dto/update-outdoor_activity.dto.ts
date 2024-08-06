import { PartialType } from '@nestjs/mapped-types';
import { CreateOutdoorActivityDto } from './create-outdoor_activity.dto';

export class UpdateOutdoorActivityDto extends PartialType(CreateOutdoorActivityDto) {}
