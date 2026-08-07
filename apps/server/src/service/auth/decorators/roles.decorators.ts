import { SystemRole } from "@/common/graphql/generated/apollo.types";
import { SetMetadata } from "@nestjs/common";
export const RequireRoles = (...roles: SystemRole[]) =>
  SetMetadata("roles", roles);
