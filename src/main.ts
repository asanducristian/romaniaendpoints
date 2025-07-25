import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for all endpoints except the root landing page
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Romania Endpoints API')
    .setDescription(
      'API for Romanian counties and localities data\n\n**Rate Limiting:** 1 request per second per IP address',
    )
    .setVersion('1.0')
    .addTag('counties', 'Romanian counties operations')
    .addTag('localities', 'Romanian localities operations')
    .addTag('postal-codes', 'Romanian postal codes operations')
    .addTag('health', 'Health check operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3010;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Landing page: http://localhost:${port}/`);
  console.log(`API endpoints available at: http://localhost:${port}/api/`);
  console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
  console.log(`Rate limiting: 1 request per second per IP`);
}
bootstrap();
