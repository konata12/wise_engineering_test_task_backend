import { Test, TestingModule } from '@nestjs/testing';
import { OutdoorActivityController } from './outdoor_activity.controller';
import { OutdoorActivityService } from './outdoor_activity.service';

describe('OutdoorActivityController', () => {
  let controller: OutdoorActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutdoorActivityController],
      providers: [OutdoorActivityService],
    }).compile();

    controller = module.get<OutdoorActivityController>(OutdoorActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
