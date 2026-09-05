import { ResetPasswordForm } from "@/components/auth/ResetPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/forgotpassword")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
