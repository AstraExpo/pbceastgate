import { LoginForm } from "@/components/auth/Login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/logIn")({
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
