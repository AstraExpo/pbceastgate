import { AuthContext } from "@/common/auth/auth.types";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentAuth = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthContext | undefined => {
    const gqlContext = GqlExecutionContext.create(context);

    const { req } = gqlContext.getContext<{
      req: Express.Request;
    }>();

    return req.auth;
  },
);
