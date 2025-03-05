import { ClientModule } from '@modules/client/client.module';
import { PostgresModule } from '@modules/database/postgres-database.module';
import { SeedModule } from '@modules/seed/seed.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InsuranceModule } from './modules/insurance/insurance.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //enable enviroment variables
    PostgresModule,
    ClientModule,
    SeedModule,
    InsuranceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
