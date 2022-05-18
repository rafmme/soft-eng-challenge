import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from '../../src/controllers/members/members.controller';
import { MembersService } from '../../src/services/members/members.service';

describe('MembersController', () => {
  let controller: MembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [MembersService],
    }).compile();

    controller = module.get<MembersController>(MembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
