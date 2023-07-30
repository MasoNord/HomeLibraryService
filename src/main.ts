import { NestFactory,  } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService,  } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';

const configService = new ConfigService;
const PORT = parseInt(configService.get<string>("PORT"));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The API for home library service")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
