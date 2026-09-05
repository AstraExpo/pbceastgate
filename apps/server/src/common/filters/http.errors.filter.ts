import { HttpException } from "@nestjs/common";
import { GraphQLError } from "graphql";

export function isHttpException(
  exception: unknown,
): exception is HttpException {
  return exception instanceof HttpException;
}

const CODE_BY_STATUS: Record<number, string> = {
  400: "BAD_USER_INPUT",
  401: "UNAUTHENTICATED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
};

export function mapHttpException(exception: HttpException): GraphQLError {
  const status = exception.getStatus();
  const response = exception.getResponse();

  const message =
    typeof response === "string"
      ? response
      : Array.isArray((response as { message?: unknown }).message)
        ? (response as { message: string[] }).message.join(", ")
        : ((response as { message?: string }).message ?? exception.message);

  return new GraphQLError(message, {
    extensions: {
      code: CODE_BY_STATUS[status] ?? "INTERNAL_SERVER_ERROR",
      statusCode: status,
    },
  });
}
