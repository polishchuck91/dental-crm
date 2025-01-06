import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UnprocessableEntityException } from './exceptions/unprocessable-entity.exception';

import { ConfigService } from '@nestjs/config';
import redis from './redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors) => {
        const errorMessages = validationErrors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));
        return new UnprocessableEntityException({
          statusCode: 422,
          message: 'Validation failed',
          errors: errorMessages,
        });
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('BACKEND_PORT') || 3000;

  await app.listen(process.env.PORT ?? port);
}
bootstrap();
