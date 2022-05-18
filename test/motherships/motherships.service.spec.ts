import { Test, TestingModule } from '@nestjs/testing';
import { MothershipsService } from '../../src/services/motherships/motherships.service';

describe('MothershipsService', () => {
  let service: MothershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MothershipsService],
    }).compile();

    service = module.get<MothershipsService>(MothershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
