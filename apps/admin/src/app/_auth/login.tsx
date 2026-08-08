import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/Authentication/Login";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <LoginForm />
    </main>
  );
}
