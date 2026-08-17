import { Logger } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { Prisma } from "@/generated/prisma/client";

const logger = new Logger("PrismaErrorFilter");

export function isPrismaError(
  exception: unknown,
): exception is Prisma.PrismaClientKnownRequestError {
  return exception instanceof Prisma.PrismaClientKnownRequestError;
}

export function mapPrismaError(
  exception: Prisma.PrismaClientKnownRequestError,
): GraphQLError {
  switch (exception.code) {
    case "P2000":
      return new GraphQLError("One of the provided values is too long.", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: exception.meta?.column_name,
        },
      });
    case "P2002":
      return new GraphQLError("This value already exists.", {
        extensions: { code: "BAD_USER_INPUT", field: exception.meta?.target },
      });
    case "P2003":
      return new GraphQLError("Referenced record does not exist.", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: exception.meta?.field_name,
        },
      });
    case "P2011":
      return new GraphQLError("A required field is missing.", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: exception.meta?.constraint,
        },
      });

    case "P2001":
    case "P2015":
    case "P2018":
    case "P2025":
      return new GraphQLError("Record not found.", {
        extensions: { code: "NOT_FOUND" },
      });

    default:
      logger.error(
        `Unmapped Prisma error code: ${exception.code}`,
        exception.message,
      );
      return new GraphQLError("A database error occurred.", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
  }
}
