import { isAdmin } from "@/hooks/auth/types";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_pbcadmin")({
  beforeLoad: ({ context, location }) => {
    if (context.auth.status !== "authenticated") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    if (!isAdmin(context.auth)) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
