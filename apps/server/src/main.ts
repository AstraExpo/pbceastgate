import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { initializeApp, cert } from 'firebase-admin/app';

async function bootstrap() {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') as string,
  };

  initializeApp({
    credential: cert(serviceAccount),
  });

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'], 
    credentials: true,
  });

  await app.listen(4000);
  console.log(`🚀 Server is running on: http://localhost:4000/graphql`);
}
bootstrap();