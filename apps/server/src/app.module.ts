import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { join } from 'path'
import { ServiceModule } from './service/service.module.js'

@Module({
  imports: [
    // Simply remove the <ApolloDriverConfig> generic parameter
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true })
      ],
    }),
    ServiceModule,
  ],
  providers: [],
})
export class AppModule {}