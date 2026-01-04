import { defineConfig } from "drizzle-kit";
import { ConfigService } from "@nestjs/config";
import "dotenv/config";

const configService = new ConfigService();

export default defineConfig({
  schema: "./src/database/schema/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: configService.getOrThrow<string>("POSTGRES_HOST"),
    port: configService.getOrThrow<number>("POSTGRES_PORT"),
    user: configService.getOrThrow<string>("POSTGRES_USER"),
    password: configService.getOrThrow<string>("POSTGRES_PASSWORD"),
    database: configService.getOrThrow<string>("POSTGRES_DB"),
    ssl: false,
  },
});
