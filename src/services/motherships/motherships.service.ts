import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Mothership from 'src/entities/motherships/mothership.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import CreateMothershipDto from '../../dto/motherships/create-mothership.dto';
import UpdateMothershipDto from '../../dto/motherships/update-mothership.dto';
import ShipsService from '../ships/ships.service';

@Injectable()
export default class MothershipsService {
  constructor(
    @InjectRepository(Mothership)
    private readonly mothershipRepository: Repository<Mothership>,
    private shipsService: ShipsService,
  ) {}

  async create(createMothershipDto: CreateMothershipDto) {
    await ResourceValidator.checkIfResourceExist(createMothershipDto, this.mothershipRepository, 'Mothership');
    const mothership: Mothership = this.mothershipRepository.create(createMothershipDto);
    const savedMotherShip = JSON.parse(
      JSON.stringify(await this.mothershipRepository.save(mothership)),
    );

    const shipDto = {
      name: savedMotherShip.name,
      mothershipId: savedMotherShip.id,
      quantity: 3,
    };

    const ship = await this.shipsService.create(shipDto);
    savedMotherShip.ships = ship.ships;

    return Util.formatJSONResponse('New Mothership created!', 201, savedMotherShip, 'mothership');
  }

  async findAll() {
    const motherships = await this.mothershipRepository.find({
      relations: ['ships'],
    });
    return Util.formatJSONResponse('All available Motherships', 200, motherships, 'motherships');
  }

  async findOne(id: string) {
    await ResourceValidator.validateResourceId(
      {
        mothershipId: id,
      },
      this.mothershipRepository,
      'Ship',
    );
    const mothership = await this.mothershipRepository.find({
      where: { id },
      relations: { ships: true },
    });
    return Util.formatJSONResponse('Mothership was found.', 200, mothership, 'mothership');
  }

  update(id: number, updateMothershipDto: UpdateMothershipDto) {
    return `This action updates a #${id} mothership`;
  }

  async remove(id: string) {
    await ResourceValidator.validateResourceId({ mothershipId: id }, this.mothershipRepository, 'Ship');
    const mothership = await this.mothershipRepository.delete({ id });
    return Util.formatJSONResponse('Ship deletion was successful.', 200, mothership, 'mothership');
  }
}
