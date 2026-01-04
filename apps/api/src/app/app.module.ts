import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import * as Joi from "joi";
import { AppController } from "src/app/app.controller";
import { asyncAuthFactory } from "src/auth/auth.factory";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        TRUSTED_ORIGINS: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        APP_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.getOrThrow<string>("POSTGRES_HOST"),
        port: configService.getOrThrow<number>("POSTGRES_PORT"),
        user: configService.getOrThrow<string>("POSTGRES_USER"),
        password: configService.getOrThrow<string>("POSTGRES_PASSWORD"),
        database: configService.getOrThrow<string>("POSTGRES_DB"),
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow<string>("REDIS_HOST"),
          port: configService.getOrThrow<number>("REDIS_PORT"),
        },
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule.forRootAsync(asyncAuthFactory),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
