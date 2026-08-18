import { isAuthenticated } from "@/hooks/auth/types";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context }) => {
    if (isAuthenticated(context.auth)) {
      throw redirect({
        to: "/home",
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}
