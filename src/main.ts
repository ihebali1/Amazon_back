import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import figlet = require('figlet');
import { ExceptionsFilter } from './shared/filters/http-exceptions.filter';
import { QueryExceptionFilter } from './shared/filters/query-exception.filter';
import express = require('express');
import path = require('path');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors();
  /**
   * Transform failure responses filter
   */
  app.useGlobalFilters(new QueryExceptionFilter());
  app.useGlobalFilters(new ExceptionsFilter());
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Amazon Banckend')
      .setDescription('The Amazon API description')
      .setVersion('1.0')
      .addTag('amazon')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api-docs', app, document);
    /** Morgan Config */
    app.use(morgan('dev'));
  }
  /** Serve static files */
  app.use(
    '/public/uploads/',
    express.static(path.join(process.cwd(), 'uploads')),
  );
  await app.listen(3001);
  /** Figlet welcome message */
  figlet('AMAZON SERVER', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  });
}

bootstrap();
