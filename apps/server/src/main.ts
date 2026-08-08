import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { initializeApp, cert } from "firebase-admin/app";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "./common/config/env.validate"; // Adjust path if needed

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService =
    app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);

  const serviceAccount = {
    projectId: configService.get("FIREBASE_PROJECT_ID", { infer: true }),
    clientEmail: configService.get("FIREBASE_CLIENT_EMAIL", { infer: true }),
    privateKey: configService.get("FIREBASE_PRIVATE_KEY", { infer: true }),
  };

  initializeApp({
    credential: cert(serviceAccount),
  });

  const allowedOriginsString = configService.get("ALLOWED_ORIGINS", {
    infer: true,
  });
  const allowedOrigins = allowedOriginsString
    ? allowedOriginsString.split(",")
    : [];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  await app.listen(4000);
  console.log(`🚀 Server is running on: http://localhost:4000/graphql`);
}
bootstrap();
