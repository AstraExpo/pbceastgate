import { getGqlRequest } from "@/common/utils/gql.context.utils";
import { User } from "@/generated/prisma/client";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User | null => {
    return getGqlRequest(context).user;
  },
);
