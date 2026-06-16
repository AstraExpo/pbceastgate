import { createFileRoute } from "@tanstack/react-router";
import { gql, OperationVariables } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

// Schema-agnostic query that runs successfully on any valid GraphQL endpoint
const TEST_CONNECTION = gql`
  query TestConnection {
    __typename
  }
`;

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { loading, error, data } = useQuery<
    { __typename: string },
    OperationVariables,
    never
  >(TEST_CONNECTION);

  return (
    <main className="min-h-dvh w-screen flex items-center justify-center flex-col gap-y-4 p-4">
      <img
        className="max-w-sm w-full"
        src="https://raw.githubusercontent.com/TanStack/tanstack.com/main/public/images/logos/splash-dark.png"
        alt="TanStack Logo"
      />
      <h1>
        <span className="line-through">Next.js</span> TanStack Start
      </h1>

      {/* Verification Terminal Layout */}
      <div className="mt-4 p-4 border rounded text-center min-w-75">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-500">
          Apollo Client Connection
        </h2>
        <div className="mt-2 text-sm">
          {loading && (
            <p className="text-amber-600 animate-pulse">
              Executing operation...
            </p>
          )}
          {error && (
            <p className="text-red-600 font-mono text-xs">
              Error: {error.message}
            </p>
          )}
          {data ? (
            <p className="text-emerald-600">
              Success. Server root type:{" "}
              <strong className="font-mono">
                {data.__typename || "Unknown"}
              </strong>
            </p>
          ) : null}
        </div>
      </div>

      <a
        className="bg-foreground text-background rounded-full px-4 py-1 hover:opacity-90"
        href="https://tanstack.com/start/latest"
        target="_blank"
      >
        Docs
      </a>
    </main>
  );
}
