import { Controller, Get, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    return {message:'executed'};
  }
  
  @Delete()
  deleteSeed() {
    return {message:'deleted'};
  }
}
