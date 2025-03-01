import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
    
@Module({

    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('POSTGRES_DB_HOST'),
            port: configService.get<number>('POSTGRES_DB_PORT'),
            username: configService.get<string>('POSTGRES_DB_USER'),
            password: configService.get<string>('POSTGRES_DB_PASSWORD'),
            database: configService.get<string>('POSTGRES_DB_NAME'),
            autoLoadEntities: true,
            synchronize: true,
    
            //En produccion
            // ssl:{
            //   rejectUnauthorized:false //Desactiva la verificación del certificado SSL. Esto significa que el cliente no verificará si el certificado SSL es emitido por una autoridad de certificación de confianza.
            // }
          }),
          inject: [ConfigService],
        }),
      ],

})
export class PostgresModule implements OnModuleInit {
  
  private logger = new Logger('Database postgres Module');

  async onModuleInit() {
    this.logger.log('Database postgres  module initialized.');
    try {
      this.logger.log('Successfully connected to the database postgres ');
    } catch (error) {
      this.logger.error('Database postgres  connection failed', error);
    }
  }
}


