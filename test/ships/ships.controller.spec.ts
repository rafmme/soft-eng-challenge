import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ShipsController from 'src/controllers/v1/ships/ships.controller';
import CreateShipDto from 'src/dto/ships/create-ship.dto';
import Member from 'src/entities/members/member.entity';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import MembersService from 'src/services/members/members.service';
import ShipsService from 'src/services/ships/ships.service';
import shipsMockData from 'test/mockData/ships.mock';
import { MockType, repositoryMockFactory } from 'test/repoMockFactory';

describe('ShipsController', () => {
  let controller: ShipsController;
  let shipRepositoryMock: MockType<Repository<Ship>>;
  let shipService: ShipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipsController],
      providers: [
        ShipsService,
        MembersService,
        {
          useFactory: repositoryMockFactory,
          provide: getRepositoryToken(Ship),
        },
        {
          useFactory: repositoryMockFactory,
          provide: getRepositoryToken(Mothership),
        },
        {
          provide: getRepositoryToken(Member),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<ShipsController>(ShipsController);
    shipRepositoryMock = module.get(getRepositoryToken(Ship));
    shipService = module.get<ShipsService>(ShipsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a Ship', async () => {
    const { id } = shipsMockData[0];
    const spy = jest.spyOn(ResourceValidator, 'validateResourceId').mockReturnValue(undefined);
    shipRepositoryMock.find.mockReturnValue(shipsMockData[0]);
    await shipService.findOne(id);

    expect((await controller.findOne(id)).message).toEqual('Ship was found.');
    expect(shipRepositoryMock.find).toHaveBeenCalledWith({
      relations: {
        mothership: true,
        members: true,
      },
      where: {
        id,
      },
    });

    spy.mockRestore();
  });

  it('should fetch all Ships', async () => {
    shipRepositoryMock.find.mockReturnValue(shipsMockData);
    await shipService.findAll();

    expect((await controller.findAll()).message).toEqual('All available Ships');
    expect(shipRepositoryMock.find).toHaveBeenCalledWith({
      relations: { mothership: true, members: true },
    });
  });

  it('should delete a Ship', async () => {
    const id = 'f367db4c-c1b9-4880-aee6-afc130a95cf0';
    const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId')
      .mockReturnValue(undefined);

    shipRepositoryMock.delete.mockReturnValue([]);
    await shipService.remove(id);

    expect((await controller.remove(id)).message)
      .toEqual('Ship deletion was successful.');
    expect(shipRepositoryMock.delete).toHaveBeenCalledWith({
      id,
    });

    validateResourceIdMock.mockRestore();
  });

  it('should add a new Ship', async () => {
    const dto: CreateShipDto = {
      mothershipId: '07fa9040-dd01-4b38-9c7e-bd7ec10e96ef',
      quantity: 2,
    };
    const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId')
      .mockReturnValue(undefined);
    const shipCountMock = jest.spyOn(Util, 'shipCount').mockReturnValue(3);
    const crewMemberCountMock = jest.spyOn(Util, 'crewCount').mockReturnValue(1);
    const spy = jest.spyOn(ResourceValidator, 'checkIfResourceExist').mockReturnValue(undefined);
    const resourceNameMock = jest.spyOn(Util, 'generateResourceName').mockReturnValue('Ship Name');

    shipRepositoryMock.create.mockReturnValue(dto);
    shipRepositoryMock.save.mockReturnValue(shipsMockData[0]);

    await shipService.create(dto);

    expect((await controller.create(dto)).message).toEqual('New Ship created!');
    expect(shipRepositoryMock.save).toHaveBeenCalled();

    shipCountMock.mockRestore();
    crewMemberCountMock.mockRestore();
    validateResourceIdMock.mockRestore();
    resourceNameMock.mockRestore();
    spy.mockRestore();
  });
});
