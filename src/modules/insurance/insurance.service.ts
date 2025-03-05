import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Insurance } from './entities/insurance.entity';
import { Repository } from 'typeorm';
import { handleDBExceptions } from '@helpers/handleBDExeptions';
import { FindInsurancesQueryDto } from './dto/find-insurances.dto';

@Injectable()
export class InsuranceService {

  constructor(
    @InjectRepository(Insurance)
    private readonly insuranceRepository: Repository<Insurance>
  ) { }

  private logger = new Logger('InsuranceSerice');

  async create(createInsuranceDto: CreateInsuranceDto) {

    try {
      const insurance = await this.insuranceRepository.create({
        ...createInsuranceDto,
      });
      await this.insuranceRepository.save(insurance);
      return { message: 'created successfully insurance' }
    } catch (error) {
      handleDBExceptions(this.logger, error, 'insurance')
    }
  }

  async findAll(findInsurancesQueryDto: FindInsurancesQueryDto) {
    const { insurance, limit = 10, offset = 0 } = findInsurancesQueryDto;

    const queryBuilder = this.insuranceRepository.createQueryBuilder('insurance')
      .take(limit)
      .skip(offset)

    if (insurance) {
      queryBuilder.andWhere(`insurance.insurance_name ILIKE :insurance`, { insurance: `%${insurance}%` })
    }
    const insurances = await queryBuilder.getMany();

    if (!insurances || insurances.length === 0) throw new NotFoundException(`insurances not found`);
    return insurances;
  }

  async findOne(id: number) {
    const insurance = await this.insuranceRepository.findOneBy({
      insurance_id: id
    });
    if (!insurance) throw new NotFoundException(`insurance not found`);
    return insurance;
  }

  async update(id: number, updateInsuranceDto: UpdateInsuranceDto) {

    try {
      const insuranceUpdated = await this.insuranceRepository.preload({
        insurance_id: id,
        ...updateInsuranceDto
      });

      if (!insuranceUpdated) throw new NotFoundException(`insurance not found`);
      await this.insuranceRepository.save(insuranceUpdated);
      return { message: 'updated successfully insurance' }
    } catch (error) {
      handleDBExceptions(this.logger, error, 'insurance')
    }
  }

  async remove(id: number) {
    const insurance = await this.findOne(id);
    insurance.insurance_is_deleted = true;
    await this.insuranceRepository.save(insurance);
    return { message: 'deleted successfully insurance' }

  }

}
