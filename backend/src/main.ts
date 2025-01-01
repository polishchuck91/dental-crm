import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UnprocessableEntityException } from './exceptions/unprocessable-entity.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');

  app.useGlobalPipes(
    new ValidationPipe({
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


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();



