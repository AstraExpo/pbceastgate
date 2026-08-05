import { JwtPayload } from "@/service/auth/strategy/jwt.service";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    // 1. Translate the context for GraphQL
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    // 2. Grab the user object attached by the GqlAuthGuard
    const user = request.user;

    // 3. Optional: If a specific property was requested (e.g., @CurrentUser('sub')), return just that.
    // Otherwise, return the whole user object.
    return data ? user?.[data] : user;
  },
);
