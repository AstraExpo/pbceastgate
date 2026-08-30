import ClientLayout from "@/components/landing/layout/ClientLayout";
import { AuthStatus } from "@/graphql";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_base")({
  beforeLoad: ({ context }) => {
    if (context.auth.status === AuthStatus.UnAuthenticated) {
      throw redirect({
        to: "/logIn",
      });
    }
  },
  component: BaseLayout,
});

function BaseLayout() {
  return (
    <ClientLayout>
      <Outlet />
    </ClientLayout>
  );
}
