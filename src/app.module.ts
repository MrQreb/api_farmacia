import { ClientModule } from '@modules/client/client.module';
import { PostgresModule } from '@modules/database/postgres-database.module';
import { SeedModule } from '@modules/seed/seed.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), //enable enviroment variables
    PostgresModule,
    ClientModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
