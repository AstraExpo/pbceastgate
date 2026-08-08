import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_pbcadmin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <nav className="p-4 border-b flex justify-between items-center">
        <span className="font-semibold">Admin:</span>
        <button className="text-sm underline opacity-70 hover:opacity-100 cursor-pointer">
          Sign out
        </button>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
