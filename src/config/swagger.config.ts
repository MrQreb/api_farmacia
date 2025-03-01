import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export function setupSwagger(app: INestApplication): void {

  const isDevelopMode = process.env.DEVELOPMODE === 'development';

  if (!isDevelopMode) {
    return;
  }
  
  //Eneble swagger in only develepor mode
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Farmacia API')
    .setDescription('API REST')
    .setVersion('1.0')
    .addTag('Farmacia')
    .addBearerAuth()
    .build();

  const document = () => SwaggerModule.createDocument(app, config);
 
  SwaggerModule.setup('api', app, document, {  
    swaggerOptions: { 
      filter: true, //To enable search bar ,Works through tags @ApiTags('Productos') in Before of @Controller
      tagsSorter: 'alpha',//Order alphabetic tags
      persistAuthorization: true,
     } 
  });
}
