import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { handleDBExceptions } from '@helpers/handleBDExeptions';
import { InsuranceService } from '@modules/insurance/insurance.service';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly insuranceService:InsuranceService
  ) { }

  private logger = new Logger('ClientService');

  async create(createClientDto: CreateClientDto) {
    const { insurance } = await this.getRelations(createClientDto);
    try {
      const client = await this.clientRepository.create({
        ...createClientDto,
         insurance
      })
      await this.clientRepository.save(client);
      return { message: 'client created successfully' };
    } catch (error) {
      handleDBExceptions(this.logger, error, 'client')
    }
  }

  //TODO: finish this method with filters
  findAll() {
    return `This action returns all client`;
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne({
      where:{client_id:id}
    });
    if(!client) throw new NotFoundException(`client not found`);
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const { insurance } = await this.getRelations(updateClientDto);
    try{
      const client = await this.clientRepository.preload({
        ...updateClientDto,
        client_id:id,
        insurance
      });      
      if (!client)  throw new NotFoundException(`client not found`);
      await this.clientRepository.save(client);
      return { message: 'client updated successfully' };

    }catch(error){
      handleDBExceptions(this.logger, error, 'client')
    }
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    client.client_is_deleted = true;
    await this.clientRepository.save(client);
    return {message:`client deleted successfully`};
  }

  private async getRelations (dto:CreateClientDto | UpdateClientDto){

    if (!dto.insurance) throw new NotFoundException(`insurance id is missing`);
    const insurance = await this.insuranceService.findOne(dto.insurance);
    return{ insurance };

  }

  async deleteAllClients() {
    await this.clientRepository.query(
      'TRUNCATE TABLE client RESTART IDENTITY CASCADE'
    );

    this.logger.debug(`all clients deleted`);
    return{message:`all clients deleted successfully`}
  }
}
