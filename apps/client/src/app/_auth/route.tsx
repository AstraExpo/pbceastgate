import { AuthStatus, SystemRole } from "@/graphql";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context }) => {
    if (context.auth.status !== AuthStatus.Authenticated) return;
    if (
      (context.auth.status === AuthStatus.Authenticated &&
        context.auth.user.systemRole == SystemRole.Admin) ||
      SystemRole.Editor ||
      SystemRole.System
    ) {
      throw redirect({ to: "/dashboard" });
    }
    throw redirect({ to: "/home" });
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}
