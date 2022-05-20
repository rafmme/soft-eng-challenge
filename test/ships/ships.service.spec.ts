import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

describe('ShipsService', () => {
  let shipService: ShipsService;
  let shipRepositoryMock: MockType<Repository<Ship>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    shipService = module.get<ShipsService>(ShipsService);
    shipRepositoryMock = module.get(getRepositoryToken(Ship));
  });

  describe('Ship', () => {
    afterAll(() => {
      shipRepositoryMock.findAndCount.mockRestore();
      shipRepositoryMock.create.mockRestore();
      shipRepositoryMock.find.mockRestore();
      shipRepositoryMock.update.mockRestore();
      shipRepositoryMock.save.mockRestore();
      shipRepositoryMock.delete.mockRestore();
      shipRepositoryMock.findOne.mockRestore();
    });

    it('ShipService should be defined', () => {
      expect(shipService).toBeDefined();
    });

    it('should find a Ship', async () => {
      const { id } = shipsMockData[0];
      const spy = jest.spyOn(ResourceValidator, 'validateResourceId')
        .mockReturnValue(undefined);
      shipRepositoryMock.find.mockReturnValue(shipsMockData[0]);
      const { message, ship } = await shipService.findOne(id);
      const { id: shipId } = ship;

      expect(message).toEqual('Ship was found.');
      expect(ship).toEqual(shipsMockData[0]);
      expect(shipId).toEqual(id);
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
      const { message, statusCode } = await shipService.findAll();

      expect(message).toEqual('All available Ships');
      expect(statusCode).toEqual(200);
      expect(shipRepositoryMock.find).toHaveBeenCalledWith({
        relations: { mothership: true, members: true },
      });
    });

    it('should delete a Ship', async () => {
      const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId')
        .mockReturnValue(undefined);

      shipRepositoryMock.delete.mockReturnValue([]);
      const { message, statusCode } = await shipService
        .remove('f367db4c-c1b9-4880-aee6-afc130a95cf0');

      expect(statusCode).toEqual(200);
      expect(message).toEqual('Ship deletion was successful.');

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

      const { message, statusCode } = await shipService.create(dto);

      expect(message).toEqual('New Ship created!');
      expect(statusCode).toEqual(201);

      shipCountMock.mockRestore();
      crewMemberCountMock.mockRestore();
      validateResourceIdMock.mockRestore();
      resourceNameMock.mockRestore();
      spy.mockRestore();
    });
  });
});
