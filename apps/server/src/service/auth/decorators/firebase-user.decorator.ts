import { getGqlRequest } from "@/common/utils/gql.context.utils";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { DecodedIdToken } from "firebase-admin/auth";

export const CurrentFirebaseUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): DecodedIdToken | null => {
    return getGqlRequest(context).firebaseUser;
  },
);
