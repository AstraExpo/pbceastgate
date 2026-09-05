import { Catch, Logger } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isHttpException, mapHttpException } from "./http.errors.filter";
import { isPrismaError, mapPrismaError } from "./prisma.errors.filter";
import {
  isFirebaseAuthError,
  mapFirebaseAuthError,
} from "./auth.errors.filter";

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown): GraphQLError {
    if (isPrismaError(exception)) {
      return mapPrismaError(exception);
    }
    if (isFirebaseAuthError(exception)) {
      return mapFirebaseAuthError(exception);
    }
    if (isHttpException(exception)) {
      return mapHttpException(exception);
    }

    this.logger.error(
      "Unhandled exception",
      exception instanceof Error ? exception.stack : exception,
    );
    return new GraphQLError("Something went wrong.", {
      extensions: { code: "INTERNAL_SERVER_ERROR" },
    });
  }
}
