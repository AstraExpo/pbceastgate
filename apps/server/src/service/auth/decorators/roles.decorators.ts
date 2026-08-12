import { SystemRole } from "@/common/graphql/generated/apollo.types";
import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";
export const RequireRoles = (...roles: SystemRole[]) =>
  SetMetadata(ROLES_KEY, roles);
