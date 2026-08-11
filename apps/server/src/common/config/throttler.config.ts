import { ThrottlerModuleOptions } from "@nestjs/throttler";
import { AppConfigService } from "./app-config.service";

export function createThrottlerConfig(
  configService: AppConfigService,
): ThrottlerModuleOptions {
  return [
    { name: "short", ...configService.throttle.short },
    { name: "medium", ...configService.throttle.medium },
    { name: "long", ...configService.throttle.long },
  ];
}
