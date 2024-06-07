import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const options = new DocumentBuilder()
      .setTitle('Course Platform')
      .setDescription('Johny ozi biled (NA)')
      .setVersion('1.0')
      .addBearerAuth(
        {
          description: 'Default JWT Authorization',
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'defaultBearerAuth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, document);
  } catch (error) {
    console.error('Error setting up Swagger', error);
  }
  app.use(express.static(join(__dirname, '../../', 'public')));
  app.enableCors();
  await app.listen(3001);
}

bootstrap();
