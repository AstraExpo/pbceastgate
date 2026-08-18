import { createFileRoute, redirect } from "@tanstack/react-router";
import { EastgateLanding } from "@/components/landing/EastgateLanding";
import { isAuthenticated } from "@/hooks/auth/types";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (isAuthenticated(context.auth)) {
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
