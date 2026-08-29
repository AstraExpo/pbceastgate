import { AuthStatus } from "@/graphql";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.auth.status === AuthStatus.Authenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: Home,
});

function Home() {
  return <div>Home</div>;
}
