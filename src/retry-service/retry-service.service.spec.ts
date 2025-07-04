import { Test, TestingModule } from '@nestjs/testing';
import { RetryServiceService } from './retry-service.service';

describe('RetryServiceService', () => {
  let service: RetryServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetryServiceService],
    }).compile();

    service = module.get<RetryServiceService>(RetryServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
