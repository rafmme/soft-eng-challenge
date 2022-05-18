import { Test, TestingModule } from '@nestjs/testing';
import { MothershipsController } from './motherships.controller';
import { MothershipsService } from './motherships.service';

describe('MothershipsController', () => {
  let controller: MothershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MothershipsController],
      providers: [MothershipsService],
    }).compile();

    controller = module.get<MothershipsController>(MothershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
