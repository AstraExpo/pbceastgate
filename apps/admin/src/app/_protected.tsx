import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@eastgate/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected")({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="opacity-70">Verifying security credentials...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <nav className="p-4 border-b flex justify-between items-center">
        <span className="font-semibold">Admin: {user.email}</span>
        <button
          onClick={signOut}
          className="text-sm underline opacity-70 hover:opacity-100 cursor-pointer"
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
