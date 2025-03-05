import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurance } from './entities/insurance.entity';

@Module({
  controllers: [InsuranceController],
  providers: [InsuranceService],
  imports:[ 
    TypeOrmModule.forFeature([Insurance]), 
  ]
})
export class InsuranceModule {}
