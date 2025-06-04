import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';

NestFactory.create(AppModule).then(async (app) => {
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: JSON.parse(process.env.ALLOW_ORIGINS),
  });

  const config = new DocumentBuilder()
    .setTitle('Coach Api')
    .setDescription('The coach API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Bearer Token',
      },
      'Jwt'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  /* eslint-disable */
  const OpenapiCodegen = require('openapi-typescript-codegen');
  await OpenapiCodegen.generate({
    input: document,
    output: resolve(__dirname, '../../client-api/src'),
    httpClient: 'fetch',
    indent: '2',
  });
  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
});
