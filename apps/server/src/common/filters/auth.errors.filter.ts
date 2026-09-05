import { Logger } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { FirebaseError } from "firebase-admin/app";

const logger = new Logger("AuthErrorFilter");

export function isFirebaseAuthError(
  exception: unknown,
): exception is FirebaseError {
  return (
    typeof exception === "object" &&
    exception !== null &&
    "code" in exception &&
    typeof (exception as FirebaseError).code === "string" &&
    (exception as FirebaseError).code.startsWith("auth/")
  );
}

const UNAUTHENTICATED_CODES = new Set([
  "auth/id-token-expired",
  "auth/id-token-revoked",
  "auth/invalid-id-token",
  "auth/argument-error",
  "auth/session-cookie-expired",
  "auth/session-cookie-revoked",
]);

const NOT_FOUND_CODES = new Set([
  "auth/user-not-found",
  "auth/email-not-found",
]);

const BAD_INPUT_CODES = new Set([
  "auth/email-already-exists",
  "auth/uid-already-exists",
  "auth/phone-number-already-exists",
  "auth/invalid-email",
  "auth/invalid-password",
  "auth/invalid-phone-number",
]);

const FORBIDDEN_CODES = new Set([
  "auth/insufficient-permission",
  "auth/user-disabled",
]);

const MESSAGES: Record<string, string> = {
  "auth/id-token-expired": "Your session has expired. Please sign in again.",
  "auth/id-token-revoked":
    "Your session is no longer valid. Please sign in again.",
  "auth/session-cookie-expired":
    "Your session has expired. Please sign in again.",
  "auth/session-cookie-revoked":
    "Your session is no longer valid. Please sign in again.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/email-already-exists": "An account with this email already exists.",
  "auth/uid-already-exists": "This account identifier is already in use.",
};

export function mapFirebaseAuthError(exception: FirebaseError): GraphQLError {
  const message = MESSAGES[exception.code] ?? "Authentication failed.";

  if (UNAUTHENTICATED_CODES.has(exception.code)) {
    return new GraphQLError(message, {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  if (FORBIDDEN_CODES.has(exception.code)) {
    return new GraphQLError(message, { extensions: { code: "FORBIDDEN" } });
  }
  if (NOT_FOUND_CODES.has(exception.code)) {
    return new GraphQLError(message, { extensions: { code: "NOT_FOUND" } });
  }
  if (BAD_INPUT_CODES.has(exception.code)) {
    return new GraphQLError(message, {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  logger.error(
    `Unmapped Firebase Auth error code: ${exception.code}`,
    exception.message,
  );
  return new GraphQLError("Authentication failed.", {
    extensions: { code: "INTERNAL_SERVER_ERROR" },
  });
}
