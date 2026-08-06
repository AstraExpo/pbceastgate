import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@eastgate/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const { user, loading, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🛡️ [_auth layout] State Check:", { loading, hasUser: !!user });

    if (!loading && user) {
      console.log(
        "✅ [_auth layout] User already logged in! Redirecting to Dashboard...",
      );

      getToken().then(token => {
        console.log("🔑 [_auth layout] JWT Token acquired:", token);
      });

      navigate({ to: "/" });
    }
  }, [user, loading, navigate, getToken]);

  if (loading) return <div>Loading auth state...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Outlet />
    </div>
  );
}
