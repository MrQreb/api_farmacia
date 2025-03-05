import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { handleDBExceptions } from '@helpers/handleBDExeptions';
import { PaginationDto } from 'src/examples/pagination-filters.dto';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) { }

  private logger = new Logger('ClientService');

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientRepository.create({
        ...createClientDto
      })
      await this.clientRepository.save(client);
      return { message: 'client created successfully' };
    } catch (error) {
      handleDBExceptions(this.logger, error, 'client')
    }
  }

  //TODO: finish this method with filters
  async findAll( paginationDto: PaginationDto ) {

    const { 
      client_birthplace, 
      client_last_name, 
      client_name, 
      client_phone, 
      client_social_number, 
      limit = 10, 
      offset = 0} = paginationDto;
    
      const queryBuilder = this.clientRepository.createQueryBuilder('client');

      if (client_birthplace) {
        queryBuilder.andWhere('client.client_birthplace = :client_birthplace', { client_birthplace });
      }
      if (client_last_name) {
        queryBuilder.andWhere('client.client_last_name = :client_last_name', { client_last_name });
      }
      if (client_name) {
        queryBuilder.andWhere('client.client_name = :client_name', { client_name });
      }
      if (client_phone) {
        queryBuilder.andWhere('client.client_phone = :client_phone', { client_phone });
      }
      if (client_social_number) {
        queryBuilder.andWhere('client.client_social_number = :client_social_number', { client_social_number });
      }
    
      queryBuilder.take(limit).skip(offset);
    
      return await queryBuilder.getMany();

  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne({
      where:{client_id:id}
    });
    if(!client) throw new NotFoundException(`client not found`);
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try{
      const client = await this.clientRepository.preload({
        ...updateClientDto,
        client_id:id
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

  async deleteAllClients() {
    await this.clientRepository.query(
      'TRUNCATE TABLE client RESTART IDENTITY CASCADE'
    );

    this.logger.debug(`all clients deleted`);
    return{message:`all clients deleted successfully`}
  }
}
