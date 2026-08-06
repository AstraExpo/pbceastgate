import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@eastgate/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected")({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const { user, loading, getToken, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🛡️ [_protected layout] State Check:", {
      loading,
      hasUser: !!user,
    });

    if (!loading && !user) {
      console.log(
        "🛑 [_protected layout] Unauthenticated! Redirecting to login...",
      );
      navigate({ to: "/login" });
    } else if (user) {
      getToken().then(token => {
        console.log(
          "🔑 [_protected layout] JWT Token ready for Apollo:",
          token,
        );
      });
    }
  }, [user, loading, navigate, getToken]);

  if (loading || !user) return <div>Verifying access...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <nav className="p-4 border-b flex justify-between items-center">
        <span className="font-semibold">Welcome, {user.email}</span>
        <button
          onClick={signOut}
          className="text-sm underline opacity-70 hover:opacity-100"
        >
          Sign out
        </button>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
