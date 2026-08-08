import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup")({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div>Client SignUp Page</div>
    </main>
  );
}
