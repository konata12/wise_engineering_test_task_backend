import { Test, TestingModule } from '@nestjs/testing';
import { OutdoorActivityService } from './outdoor_activity.service';

describe('OutdoorActivityService', () => {
  let service: OutdoorActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutdoorActivityService],
    }).compile();

    service = module.get<OutdoorActivityService>(OutdoorActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
