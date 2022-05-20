import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Member from 'src/entities/members/member.entity';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import MembersService from 'src/services/members/members.service';
import MothershipsService from 'src/services/motherships/motherships.service';
import ShipsService from 'src/services/ships/ships.service';
import mothershipsMockData from 'test/mockData/motherships.mock';
import { MockType, repositoryMockFactory } from 'test/repoMockFactory';

describe('MothershipsService', () => {
  let mothershipService: MothershipsService;
  let mothershipRepositoryMock: MockType<Repository<Mothership>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    mothershipService = module.get<MothershipsService>(MothershipsService);
    mothershipRepositoryMock = module.get(getRepositoryToken(Mothership));
  });

  describe('Mothership', () => {
    afterAll(() => {
      mothershipRepositoryMock.findAndCount.mockRestore();
      mothershipRepositoryMock.create.mockRestore();
      mothershipRepositoryMock.find.mockRestore();
      mothershipRepositoryMock.update.mockRestore();
      mothershipRepositoryMock.save.mockRestore();
      mothershipRepositoryMock.delete.mockRestore();
      mothershipRepositoryMock.findOne.mockRestore();
    });

    it('Mothership service should be defined', () => {
      expect(mothershipService).toBeDefined();
    });

    it('should find a Mothership', async () => {
      const { id } = mothershipsMockData[0];
      const spy = jest.spyOn(ResourceValidator, 'validateResourceId')
        .mockReturnValue(undefined);
      mothershipRepositoryMock.find.mockReturnValue(mothershipsMockData[0]);
      const { message, mothership } = await mothershipService.findOne(id);
      const { id: mothershipId } = mothership;

      expect(message).toEqual('Mothership was found.');
      expect(mothership).toEqual(mothershipsMockData[0]);
      expect(mothershipId).toEqual(id);
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
      const { message, statusCode } = await mothershipService.findAll();

      expect(message).toEqual('All available Motherships');
      expect(statusCode).toEqual(200);
      expect(mothershipRepositoryMock.find).toHaveBeenCalledWith({
        relations: ['ships'],
      });
    });

    it('should delete a Mothership', async () => {
      const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId')
        .mockReturnValue(undefined);

      mothershipRepositoryMock.delete.mockReturnValue([]);
      const { message, statusCode, mothership } = await mothershipService.remove(
        'f367db4c-c1b9-4880-aee6-afc130a95cf0',
      );

      expect(statusCode).toEqual(200);
      expect(message).toEqual('Mothership deletion was successful.');
      expect(mothership).toEqual([]);

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

      const { message, statusCode, mothership } = await mothershipService.create(dto);
      const { name } = mothership;

      expect(message).toEqual('New Mothership created!');
      expect(statusCode).toEqual(201);
      expect(name).toEqual(mothershipsMockData[0].name);

      shipCountMock.mockRestore();
      crewMemberCountMock.mockRestore();
      validateResourceIdMock.mockRestore();
      resourceNameMock.mockRestore();
      spy.mockRestore();
    });
  });
});
