import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateMemberDto from 'src/dto/members/create-member.dto';
import UpdateMemberDto from 'src/dto/members/update-member.dto';
import Member from 'src/entities/members/member.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import MembersService from 'src/services/members/members.service';
import membersMockData from 'test/mockData/members.mock';
import { MockType, repositoryMockFactory } from 'test/repoMockFactory';

describe('MembersService', () => {
  let service: MembersService;
  let memberRepositoryMock: MockType<Repository<Member>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getRepositoryToken(Member),
          useFactory: repositoryMockFactory,
        },
        {
          useFactory: repositoryMockFactory,
          provide: getRepositoryToken(Ship),
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    memberRepositoryMock = module.get(getRepositoryToken(Member));
  });

  describe('Crew Member', () => {
    afterAll(() => {
      memberRepositoryMock.findAndCount.mockRestore();
      memberRepositoryMock.create.mockRestore();
      memberRepositoryMock.find.mockRestore();
      memberRepositoryMock.update.mockRestore();
      memberRepositoryMock.save.mockRestore();
      memberRepositoryMock.delete.mockRestore();
      memberRepositoryMock.findOne.mockRestore();
    });

    it('MemberService should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should find a crew member', async () => {
      const { id } = membersMockData[0];
      const spy = jest.spyOn(ResourceValidator, 'validateResourceId').mockReturnValue(undefined);
      memberRepositoryMock.find.mockReturnValue(membersMockData[0]);
      const { message, crewMember } = await service.findOne(id);
      const { id: memberId } = crewMember;

      expect(message).toEqual('Crew Member was found.');
      expect(crewMember).toEqual(membersMockData[0]);
      expect(memberId).toEqual(id);
      expect(memberRepositoryMock.find).toHaveBeenCalledWith({
        relations: { ship: true },
        where: {
          id,
        },
      });

      spy.mockRestore();
    });

    it('should fetch all crew members', async () => {
      memberRepositoryMock.find.mockReturnValue(membersMockData);
      const { message, statusCode } = await service.findAll();

      expect(message).toEqual('All available Crew Members');
      expect(statusCode).toEqual(200);
      expect(memberRepositoryMock.find).toHaveBeenCalledWith({
        relations: { ship: true },
      });
    });

    it('should delete a crew member', async () => {
      const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId').mockReturnValue(undefined);

      memberRepositoryMock.delete.mockReturnValue([]);
      const { message, statusCode } = await service.remove('f367db4c-c1b9-4880-aee6-afc130a95cf0');

      expect(statusCode).toEqual(200);
      expect(message).toEqual('Crew Member deletion was successful.');

      validateResourceIdMock.mockRestore();
    });

    it('should update a crew member', async () => {
      const dto: UpdateMemberDto = {
        from_ship: '07fa9040-dd01-4b38-9c7e-bd7ec10e96ef',
        to_ship: '8aef48f3-d225-42e7-8e2e-bf58dc5a69bc',
        name: 'Lesane Parish Crooks',
      };
      const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId').mockReturnValue(undefined);
      const shipCountMock = jest.spyOn(Util, 'shipCount').mockReturnValue(3);
      const crewMemberCountMock = jest.spyOn(Util, 'crewCount').mockReturnValue(1);
      const spy = jest.spyOn(ResourceValidator, 'checkIfResourceExist').mockReturnValue(undefined);
      const resourceNameMock = jest.spyOn(Util, 'generateResourceName').mockReturnValue('Member Name');

      memberRepositoryMock.findAndCount.mockReturnValue([membersMockData, 2]);
      memberRepositoryMock.create.mockReturnValue(membersMockData[0]);
      memberRepositoryMock.update.mockReturnValue(membersMockData[0]);

      const { message, statusCode } = await service.update('Lesane Parish Crooks', dto);

      expect(message).toEqual('Crew Member was successfully switched.');
      expect(statusCode).toEqual(200);

      shipCountMock.mockRestore();
      crewMemberCountMock.mockRestore();
      validateResourceIdMock.mockRestore();
      resourceNameMock.mockRestore();
      spy.mockRestore();
    });

    it('should add a new crew member', async () => {
      const dto: CreateMemberDto = {
        shipId: '07fa9040-dd01-4b38-9c7e-bd7ec10e96ef',
        name: 'Lesane Parish Crooks',
      };
      const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId').mockReturnValue(undefined);
      const shipCountMock = jest.spyOn(Util, 'shipCount').mockReturnValue(3);
      const crewMemberCountMock = jest.spyOn(Util, 'crewCount').mockReturnValue(1);
      const spy = jest.spyOn(ResourceValidator, 'checkIfResourceExist').mockReturnValue(undefined);
      const resourceNameMock = jest.spyOn(Util, 'generateResourceName').mockReturnValue('Member Name');

      memberRepositoryMock.create.mockReturnValue(dto);
      memberRepositoryMock.save.mockReturnValue(membersMockData[0]);

      const { message, statusCode } = await service.create(dto);

      expect(message).toEqual('New Crew Member added!');
      expect(statusCode).toEqual(201);

      shipCountMock.mockRestore();
      crewMemberCountMock.mockRestore();
      validateResourceIdMock.mockRestore();
      resourceNameMock.mockRestore();
      spy.mockRestore();
    });
  });
});
