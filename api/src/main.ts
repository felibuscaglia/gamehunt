import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

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
        const formattedErrors = {};
        errors.forEach((error) => {
          const constraints = error.constraints;
          if (constraints) {
            formattedErrors[error.property] = Object.values(constraints);
          }
        });
        
        throw new BadRequestException({
          errors: formattedErrors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
