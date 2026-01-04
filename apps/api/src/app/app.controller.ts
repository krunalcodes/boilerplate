import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("app")
@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  @Get()
  @ApiOperation({ summary: "Get application status" })
  getAppStatus(): { status: string; message: string } {
    return {
      status: "ok",
      message: "Application is running.",
    };
  }
}
