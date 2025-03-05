import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { InsuranceModule } from '@modules/insurance/insurance.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports:[
    TypeOrmModule.forFeature([Client]),
    InsuranceModule
  ],
  exports:[ClientService]
})
export class ClientModule {}
