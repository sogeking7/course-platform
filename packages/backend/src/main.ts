import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const options = new DocumentBuilder()
      .setTitle('Course Platform')
      .setDescription('Johny ozi biled (NA)')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, document);
  } catch (error) {
    console.error('Error setting up Swagger', error);
  }

  await app.listen(3001);
}

bootstrap();
