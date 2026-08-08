import { useAdminAuth } from "@/components/AuthProvider/auth.context";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const { serverUser, isInitializing } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitializing && serverUser) {
      navigate({ to: "/" });
    }
  }, [serverUser, isInitializing, navigate]);
  if (isInitializing) {
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
