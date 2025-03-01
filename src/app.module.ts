import { Module } from '@nestjs/common';
import { PostgresModule } from './modules/database/postgres-database.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //enable enviroment variables
    PostgresModule,
    ClientModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
