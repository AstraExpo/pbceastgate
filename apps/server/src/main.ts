import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Enable CORS so your TanStack Start web app can fetch data from here
  app.enableCors()
  
  await app.listen(4000)
  console.log(`🚀 Server is running on: http://localhost:4000/graphql`)
}
bootstrap()