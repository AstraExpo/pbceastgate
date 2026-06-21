import { createFileRoute } from "@tanstack/react-router";
import { EastgateLanding } from "@/components/landing/EastgateLanding";
import { mockHeroData } from "@/components/landing/layout/mock.data";

export const Route = createFileRoute("/_base/")({
  component: Home,
});

function Home() {
  return (
    <>
      <EastgateLanding pageData={mockHeroData} />
    </>
  );
}
