import { createFileRoute } from "@tanstack/react-router";
import { EastgateLanding } from "@/components/landing/EastgateLanding";

export const Route = createFileRoute("/_base/")({
  component: Home,
});

function Home() {
  return (
    <>
      <EastgateLanding />
    </>
  );
}
