import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { FindInsurancesQueryDto } from './dto/find-insurances.dto';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post()
  create(@Body() createInsuranceDto: CreateInsuranceDto) {
    return this.insuranceService.create(createInsuranceDto);
  }

  @Get()
  findAll(@Query() findInsurancesQueryDto:FindInsurancesQueryDto) {
    return this.insuranceService.findAll(findInsurancesQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insuranceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuranceDto: UpdateInsuranceDto) {
    return this.insuranceService.update(+id, updateInsuranceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insuranceService.remove(+id);
  }
}
