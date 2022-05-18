import { Test, TestingModule } from '@nestjs/testing';
import { ShipsController } from '../../src/controllers/ships/ships.controller';
import { ShipsService } from '../../src/services/ships/ships.service';

describe('ShipsController', () => {
  let controller: ShipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipsController],
      providers: [ShipsService],
    }).compile();

    controller = module.get<ShipsController>(ShipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
