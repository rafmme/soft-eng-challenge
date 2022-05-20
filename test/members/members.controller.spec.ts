import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import MembersController from 'src/controllers/v1/members/members.controller';
import CreateMemberDto from 'src/dto/members/create-member.dto';
import UpdateMemberDto from 'src/dto/members/update-member.dto';
import Member from 'src/entities/members/member.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import MembersService from 'src/services/members/members.service';
import membersMockData from 'test/mockData/members.mock';
import { MockType, repositoryMockFactory } from 'test/repoMockFactory';

describe('MembersController', () => {
  let controller: MembersController;
  let memberRepositoryMock: MockType<Repository<Member>>;
  let service: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
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

    controller = module.get<MembersController>(MembersController);
    memberRepositoryMock = module.get(getRepositoryToken(Member));
    service = module.get<MembersService>(MembersService);
  });

  afterAll(() => {
    memberRepositoryMock.findAndCount.mockRestore();
    memberRepositoryMock.create.mockRestore();
    memberRepositoryMock.find.mockRestore();
    memberRepositoryMock.update.mockRestore();
    memberRepositoryMock.save.mockRestore();
    memberRepositoryMock.delete.mockRestore();
    memberRepositoryMock.findOne.mockRestore();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a crew member', async () => {
    const { id } = membersMockData[0];
    const spy = jest.spyOn(ResourceValidator, 'validateResourceId')
      .mockReturnValue(undefined);

    memberRepositoryMock.find.mockRestore();
    memberRepositoryMock.find.mockReturnValue(membersMockData[0]);

    await service.findOne(id);

    expect(await controller.findOne(id)).toEqual({
      statusCode: 200,
      message: 'Crew Member was found.',
      crewMember: membersMockData[0],
    });
    expect(memberRepositoryMock.find).toHaveBeenCalledWith({
      relations: { ship: true },
      where: {
        id,
      },
    });

    spy.mockRestore();
    memberRepositoryMock.find.mockRestore();
  });

  it('should fetch all crew members', async () => {
    memberRepositoryMock.find.mockReturnValue(membersMockData);
    await service.findAll();

    expect((await controller.findAll()).statusCode).toEqual(200);
    expect(memberRepositoryMock.find).toHaveBeenCalledWith({
      relations: { ship: true },
    });
  });

  it('should delete a crew member', async () => {
    const id = 'f367db4c-c1b9-4880-aee6-afc130a95cf0';
    const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId')
      .mockReturnValue(undefined);

    memberRepositoryMock.delete.mockReturnValue([]);
    await service.remove(id);

    expect((await controller.remove(id)).message).toEqual('Crew Member deletion was successful.');
    expect(memberRepositoryMock.delete).toHaveBeenCalledWith({
      id,
    });

    validateResourceIdMock.mockRestore();
  });

  it('should update a crew member', async () => {
    const name = 'Jermaine Cole';
    const dto: UpdateMemberDto = {
      from_ship: '07fa9040-dd01-4b38-9c7e-bd7ec10e96ef',
      to_ship: '8aef48f3-d225-42e7-8e2e-bf58dc5a69bc',
      name,
    };
    const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId').mockReturnValue(undefined);
    const shipCountMock = jest.spyOn(Util, 'shipCount').mockReturnValue(3);
    const crewMemberCountMock = jest.spyOn(Util, 'crewCount').mockReturnValue(1);
    const spy = jest.spyOn(ResourceValidator, 'checkIfResourceExist').mockReturnValue(undefined);
    const resourceNameMock = jest.spyOn(Util, 'generateResourceName').mockReturnValue('Member Name');

    memberRepositoryMock.findAndCount.mockReturnValue([membersMockData, 2]);
    memberRepositoryMock.create.mockReturnValue(membersMockData[0]);
    memberRepositoryMock.update.mockReturnValue(membersMockData[0]);

    await service.update(name, dto);

    expect((await controller.update(name, dto)).message)
      .toEqual('Crew Member was successfully switched.');
    expect(memberRepositoryMock.update).toHaveBeenCalled();

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
    const validateResourceIdMock = jest.spyOn(ResourceValidator, 'validateResourceId')
      .mockReturnValue(undefined);
    const shipCountMock = jest.spyOn(Util, 'shipCount').mockReturnValue(3);
    const crewMemberCountMock = jest.spyOn(Util, 'crewCount').mockReturnValue(1);
    const spy = jest.spyOn(ResourceValidator, 'checkIfResourceExist').mockReturnValue(undefined);
    const resourceNameMock = jest.spyOn(Util, 'generateResourceName').mockReturnValue('Member Name');

    memberRepositoryMock.create.mockReturnValue(dto);
    memberRepositoryMock.save.mockReturnValue(membersMockData[0]);

    await service.create(dto);

    expect((await controller.create(dto)).message).toEqual('New Crew Member added!');
    expect(memberRepositoryMock.save).toHaveBeenCalled();

    shipCountMock.mockRestore();
    crewMemberCountMock.mockRestore();
    validateResourceIdMock.mockRestore();
    resourceNameMock.mockRestore();
    spy.mockRestore();
  });
});
