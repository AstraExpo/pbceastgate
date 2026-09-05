import { createFileRoute, redirect } from "@tanstack/react-router";
import { EastgateLanding } from "@/components/landing/EastgateLanding";
import { AuthStatus } from "@/graphql";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.auth.status === AuthStatus.Authenticated) {
      throw redirect({
        to: "/home",
      });
    }
  },
  component: Home,
});

function Home() {
  return <EastgateLanding />;
}
