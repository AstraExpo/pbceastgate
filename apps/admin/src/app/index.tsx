import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAdmin } from "@/hooks/auth/types";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (isAdmin(context.auth)) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: Home,
});

function Home() {
  return <div>Home</div>;
}
