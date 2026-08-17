import { toast } from "@eastgate/ui/components/sonner";
export type GraphQLErrorCode =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "BAD_USER_INPUT"
  | "NOT_FOUND"
  | "INTERNAL_SERVER_ERROR";

export function handleGraphQLError(error: {
  message: string;
  code?: string;
  statusCode?: number;
}) {
  switch (error.code) {
    case "UNAUTHENTICATED":
      toast.warning("Authentication required", {
        description: error.message || "Please sign in to continue.",
      });
      break;

    case "FORBIDDEN":
      toast.error("Access denied", {
        description:
          error.message || "You don't have permission to perform this action.",
      });
      break;

    case "BAD_USER_INPUT":
      toast.error("Invalid request", {
        description: error.message,
      });
      break;

    case "NOT_FOUND":
      toast.error("Not found", {
        description: error.message,
      });
      break;

    case "INTERNAL_SERVER_ERROR":
      toast.error("Server error", {
        description: "Something went wrong. Please try again.",
      });
      break;

    default:
      toast.error("Request failed", {
        description: error.message,
      });
  }
}

interface GraphQLErrorLike {
  message: string;
  extensions?: {
    code?: string;
    statusCode?: number;
    [key: string]: unknown;
  };
}

export interface MappedGraphQLError {
  title: string;
  message: string;
  type: "error" | "warning" | "info";
}

export function mapGraphQLError(error: GraphQLErrorLike): MappedGraphQLError {
  const code = error.extensions?.code;

  switch (code) {
    case "UNAUTHENTICATED":
      return {
        title: "Authentication required",
        message: error.message || "Please sign in to continue.",
        type: "warning",
      };

    case "FORBIDDEN":
      return {
        title: "Access denied",
        message:
          error.message || "You don't have permission to perform this action.",
        type: "error",
      };

    case "BAD_USER_INPUT":
      return {
        title: "Invalid request",
        message: error.message || "Please check the information you provided.",
        type: "error",
      };

    case "NOT_FOUND":
      return {
        title: "Not found",
        message: error.message || "The requested resource could not be found.",
        type: "error",
      };

    case "INTERNAL_SERVER_ERROR":
      return {
        title: "Something went wrong",
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      };

    default:
      return {
        title: "Request failed",
        message: error.message || "The request could not be completed.",
        type: "error",
      };
  }
}
