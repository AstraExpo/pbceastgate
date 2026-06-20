import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_base")({
  component: BaseLayout,
});

function BaseLayout() {
  return (
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
}