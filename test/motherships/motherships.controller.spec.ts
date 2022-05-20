import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Member from 'src/entities/members/member.entity';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import MembersService from 'src/services/members/members.service';
import ShipsService from 'src/services/ships/ships.service';
import mothershipsMockData from 'test/mockData/motherships.mock';
import { MockType, repositoryMockFactory } from 'test/repoMockFactory';
import MothershipsController from '../../src/controllers/v1/motherships/motherships.controller';
import MothershipsService from '../../src/services/motherships/motherships.service';

describe('MothershipsController', () => {
  let controller: MothershipsController;
  let mothershipRepositoryMock: MockType<Repository<Mothership>>;
  let mothershipService: MothershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MothershipsController],
      providers: [
        MothershipsService,
        ShipsService,
        MembersService,
        {
          useFactory: repositoryMockFactory,
          provide: getRepositoryToken(Mothership),
        },
        {
          useFactory: repositoryMockFactory,
          provide: getRepositoryToken(Ship),
        },
        {
          provide: getRepositoryToken(Member),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<MothershipsController>(MothershipsController);
    mothershipRepositoryMock = module.get(getRepositoryToken(Mothership));
    mothershipService = module.get<MothershipsService>(MothershipsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a Mothership', async () => {
    const { id } = mothershipsMockData[0];
    const spy = jest.spyOn(ResourceValidator, 'validateResourceId')
      .mockReturnValue(undefined);
    mothershipRepositoryMock.find.mockReturnValue(mothershipsMockData[0]);
    await mothershipService.findOne(id);

    expect((await controller.findOne(id)).message).toEqual('Mothership was found.');
    expect(mothershipRepositoryMock.find).toHaveBeenCalledWith({
      relations: { ships: true },
      where: {
        id,
      },
    });

    spy.mockRestore();
  });

  it('should fetch all Motherships', async () => {
    mothershipRepositoryMock.find.mockReturnValue(mothershipsMockData);
    await mothershipService.findAll();

    expect((await controller.findAll()).message).toEqual('All available Motherships');
    expect(mothershipRepositoryMock.find).toHaveBeenCalledWith({
      relations: ['ships'],
    });
  });

  it('should delete a Mothership', async () => {
    const id = 'f367db4c-c1b9-4880-aee6-afc130a95cf0';
    const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId')
      .mockReturnValue(undefined);

    mothershipRepositoryMock.delete.mockReturnValue({});
    await mothershipService.remove(
      id,
    );

    expect((await controller.remove(id)).message).toEqual('Mothership deletion was successful.');
    expect(mothershipRepositoryMock.delete).toHaveBeenCalledWith({
      id,
    });

    validateResourceIdMock.mockRestore();
  });

  it('should add a new Mothership', async () => {
    const dto = { name: 'MS Carl Vincent' };
    const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId')
      .mockReturnValue(undefined);
    const shipCountMock = jest.spyOn(Util, 'shipCount').mockReturnValue(3);
    const crewMemberCountMock = jest.spyOn(Util, 'crewCount').mockReturnValue(1);
    const spy = jest.spyOn(ResourceValidator, 'checkIfResourceExist')
      .mockReturnValue(undefined);
    const resourceNameMock = jest.spyOn(Util, 'generateResourceName')
      .mockReturnValue('Ship Name');

    mothershipRepositoryMock.create.mockReturnValue(dto);
    mothershipRepositoryMock.save.mockReturnValue(mothershipsMockData[0]);

    await mothershipService.create(dto);

    expect((await controller.create(dto)).message).toEqual('New Mothership created!');
    expect(mothershipRepositoryMock.save).toHaveBeenCalled();

    shipCountMock.mockRestore();
    crewMemberCountMock.mockRestore();
    validateResourceIdMock.mockRestore();
    resourceNameMock.mockRestore();
    spy.mockRestore();
  });
});
