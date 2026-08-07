import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@eastgate/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/" });
    }
  }, [user, loading, navigate]);

  // Hold rendering entirely until Firebase resolves initial state, preventing layout shifts
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="opacity-70">Initializing session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Outlet />
    </div>
  );
}
