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
    // --- User-actionable: bad input ---
    case "P2000": // value too long for column
      return new GraphQLError("One of the provided values is too long.", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: exception.meta?.column_name,
        },
      });
    case "P2002": // unique constraint
      return new GraphQLError("This value already exists.", {
        extensions: { code: "BAD_USER_INPUT", field: exception.meta?.target },
      });
    case "P2003": // foreign key constraint
      return new GraphQLError("Referenced record does not exist.", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: exception.meta?.field_name,
        },
      });
    case "P2011": // null constraint
      return new GraphQLError("A required field is missing.", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: exception.meta?.constraint,
        },
      });

    // --- Not found ---
    case "P2001": // record in where condition doesn't exist
    case "P2015": // related record not found
    case "P2018": // required connected records not found
    case "P2025": // depends on records that were required but not found
      return new GraphQLError("Record not found.", {
        extensions: { code: "NOT_FOUND" },
      });

    // --- Everything else: infra-level, not the user's fault, don't leak details ---
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
