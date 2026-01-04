import { ConfigService } from "@nestjs/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { DrizzleService } from "src/database/drizzle.service";

export const asyncAuthFactory = {
  inject: [ConfigService, DrizzleService],
  useFactory: (configService: ConfigService, drizzleService: DrizzleService) => {
    return {
      auth: betterAuth({
        database: drizzleAdapter(drizzleService.db, {
          provider: "pg",
          usePlural: true,
        }),
        trustedOrigins: [configService.getOrThrow<string>("TRUSTED_ORIGINS")],
        plugins: [openAPI()],
        emailAndPassword: {
          enabled: true,
          requireEmailVerification: true,
        },
        socialProviders: {
          google: {
            enabled: true,
            clientId: configService.getOrThrow<string>("GOOGLE_CLIENT_ID"),
            clientSecret: configService.getOrThrow<string>("GOOGLE_CLIENT_SECRET"),
            redirectUri: `${configService.getOrThrow<string>("APP_URL")}/api/auth/callback/google`,
          },
        },
        advanced: {
          database: {
            generateId: false,
          },
        },
      }),
    };
  },
};
