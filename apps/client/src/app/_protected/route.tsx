import { AuthStatus } from "@/graphql";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context }) => {
    if (context.auth.status === AuthStatus.UnAuthenticated) {
      throw redirect({
        to: "/logIn",
      });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return <Outlet />;
}
