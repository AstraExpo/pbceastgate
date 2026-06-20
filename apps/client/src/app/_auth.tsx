import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/40">
      <div className="w-full max-w-md bg-background border border-border p-6 sm:p-8 rounded-xl shadow-sm">
        <Outlet />
      </div>
    </main>
  );
}