import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllHttpExceptionFiler } from './utils/http-exception.filter';


const configService = new ConfigService();
const PORT = parseInt(configService.get<string>('PORT'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Home library Service')
    .setDescription('The API for home library service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  // app.useLogger(app.get(MyLogger));
  app.useGlobalFilters(new AllHttpExceptionFiler(app.get(HttpAdapterHost)));
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(PORT);
}
bootstrap();
