import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { formatValidationErrors } from 'users/lib/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.UI_URL,
      credentials: true,
    },
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        throw new BadRequestException({
          errors: formatValidationErrors(errors),
        });
      },
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
