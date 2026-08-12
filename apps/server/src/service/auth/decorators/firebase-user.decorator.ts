import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { DecodedIdToken } from "firebase-admin/auth";

export const CurrentFirebaseUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): DecodedIdToken | null => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.firebaseUser;
  },
);
