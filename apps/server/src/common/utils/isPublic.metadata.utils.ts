import { IS_PUBLIC_KEY } from "@/service/auth/decorators/public.decorators";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export function isPublicRoute(
  reflector: Reflector,
  context: ExecutionContext,
): boolean {
  return !!reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);
}
