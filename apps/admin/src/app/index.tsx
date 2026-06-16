import { MinistryManagementDashboard } from "@/components/Ministry ManagementDashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {

  return (
    <main className="min-h-dvh w-screen flex items-center justify-center flex-col gap-y-4 p-4">
      <MinistryManagementDashboard />
    </main>
  );
}
