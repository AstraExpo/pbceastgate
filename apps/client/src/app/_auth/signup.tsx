import { SignupForm } from "@/components/auth/Signup";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup")({
  component: SignUpPage,
});

function SignUpPage() {
  return <SignupForm />;
}
