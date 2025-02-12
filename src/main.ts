import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());


  const config = new DocumentBuilder()
    .setTitle('JAGU')
    .setDescription('Jagu E-Commerce backend')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Input your JWT token',
        name: 'Authorization',
        in: 'header',
      },
      'jwt',
    )

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);


  await app.listen(8000);
}
bootstrap();
