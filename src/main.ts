import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //! Swagger Kurulumu

  const config = new DocumentBuilder()
    .setTitle('Note App Api') // Swager dökümantasyonuna başlık eklenebilir
    .setDescription('Note Uygulamasına ait Api Dokümanta  syonu')
    .setVersion('1.0')
    .addTag('Notes')
    .addBearerAuth() // Bearer Auth için eklendi
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
