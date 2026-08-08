import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/forgotpassword")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div>Client Password Reset Page</div>
    </main>
  );
}
