import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export function getGqlRequest(context: ExecutionContext) {
  return GqlExecutionContext.create(context).getContext().req;
}
