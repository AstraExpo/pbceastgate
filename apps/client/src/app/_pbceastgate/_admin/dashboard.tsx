import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_pbceastgate/_admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { auth } = Route.useRouteContext();
  const status = auth.status;
  const user = auth.user;
  return (
    <div>
      <h1>User Status: {status}</h1>
      <p>User: {JSON.stringify(user)}</p>
    </div>
  );
}
