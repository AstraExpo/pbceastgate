import { AuthStatus } from "@/graphql";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_pbcadmin")({
  beforeLoad: ({ context }) => {
    if (context.auth.status === AuthStatus.UnAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
