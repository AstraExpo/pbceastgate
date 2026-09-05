import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppConfigService } from "./common/config/app-config.service";
import { initializeFirebaseAdmin } from "./common/firebase/firebase.provider";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);

  initializeFirebaseAdmin(configService);

  app.enableCors({ origin: configService.allowedOrigins, credentials: true });

  await app.listen(4000);
  console.log(`🚀 Server is running on: http://localhost:4000/graphql`);
}
bootstrap();
