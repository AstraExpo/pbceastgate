import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_pbcadmin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
