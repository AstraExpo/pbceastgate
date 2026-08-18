import ClientLayout from "@/components/landing/layout/ClientLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_base")({
  component: BaseLayout,
});

function BaseLayout() {
  return (
    <ClientLayout>
      <Outlet />
    </ClientLayout>
  );
}
