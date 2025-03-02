import { Injectable, Logger } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { handleDBExceptions } from '@helpers/handleBDExeptions';

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

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }

  async deleteAllClients() {
    await this.clientRepository.query(
      'TRUNCATE TABLE client RESTART IDENTITY CASCADE'
    );

    this.logger.debug(`all clients deleted`);
    return{message:`all clients deleted successfully`}
  }
}
