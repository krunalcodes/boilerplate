import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("API documentation")
    .setVersion("1.0")
    .addTag("api")
    .build();

  type SwaggerAppType = Parameters<typeof SwaggerModule.createDocument>[0];
  const swaggerApp = app as unknown as SwaggerAppType;
  const document = SwaggerModule.createDocument(swaggerApp, config);
  SwaggerModule.setup("api", swaggerApp, document);

  await app.listen(8000);

  Logger.log(`Application is running on: http://localhost:8000`);
  Logger.log(`Swagger documentation: http://localhost:8000/api`);
}

void bootstrap();
