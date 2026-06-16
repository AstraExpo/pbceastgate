import {
  useCreateMinistry,
  useDeleteMinistry,
  useGetMinistries,
  useUpdateMinistry,
} from "@/hooks/ministry";
import { Button } from "@eastgate/ui/components/button";
import { useState } from "react";

export function MinistryManagementDashboard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Operational Custom Hooks
  const {
    ministries,
    isPending: loadingFetch,
    error: errorFetch,
  } = useGetMinistries();
  const { createMinistry, isPending: loadingCreate } = useCreateMinistry();
  const { updateMinistry, isPending: loadingUpdate } = useUpdateMinistry();
  const { deleteMinistry } = useDeleteMinistry();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId !== null) {
        await updateMinistry(editingId, {
          name,
          description: description || undefined,
        });
        setEditingId(null);
      } else {
        await createMinistry({
          name,
          description: description || undefined,
        });
      }
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Operation failed:", err);
    }
  };

  const handleEditSetup = (ministry: {
    id: number;
    name: string;
    description?: string | null;
  }) => {
    setEditingId(ministry.id);
    setName(ministry.name);
    setDescription(ministry.description || "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Confirm record deletion?")) return;
    try {
      await deleteMinistry(id);
    } catch (err) {
      console.error("Deletion failed:", err);
    }
  };

  return (
    <main className="min-h-dvh w-screen bg-background text-foreground p-4 sm:p-6 md:p-8 flex flex-col items-center gap-y-6">
      <header className="w-full max-w-5xl text-center md:text-left border-b pb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl tracking-tight font-bold">
          Ministry Synchronization Test Suite
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
          Validating operational communication across the network stack.
        </p>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
        {/* Form Section */}
        <section className="col-span-1 border p-4 rounded-xl bg-card">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-4">
            {editingId !== null
              ? "Modify Existing Ministry"
              : "Register New Ministry"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium">
                Ministry Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Media & Communications"
                className="w-full border rounded px-3 py-2 text-xs sm:text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium">
                Description
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Provide administrative context..."
                className="w-full border rounded px-3 py-2 text-xs sm:text-sm bg-transparent h-24 resize-none focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <button
                type="submit"
                disabled={loadingCreate || loadingUpdate}
                className="w-full bg-foreground text-background text-xs sm:text-sm py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loadingCreate || loadingUpdate
                  ? "Processing..."
                  : editingId !== null
                    ? "Apply Modifications"
                    : "Persist Record"}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full border text-xs sm:text-sm py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel Selection
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Database Target Output Section */}
        <section className="col-span-1 md:col-span-2 border p-4 rounded-xl bg-card w-full">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-4">
            Active Database Registry
          </h2>

          {loadingFetch && (
            <p className="text-xs sm:text-sm text-amber-600 animate-pulse font-medium">
              Querying remote GraphQL service endpoints...
            </p>
          )}

          {errorFetch && (
            <div className="p-3 border border-red-500 rounded bg-red-500/10 text-red-600 font-mono text-[11px] sm:text-xs overflow-x-auto">
              Fetch Failure: {errorFetch.message}
            </div>
          )}

          {!loadingFetch && ministries.length === 0 && (
            <p className="text-xs sm:text-sm text-gray-400 font-normal">
              Channel verified. Node table contains zero active records.
            </p>
          )}

          <div className="flex flex-col gap-y-3">
            {ministries.map(ministry => {
              // 1. Guard against incomplete database entries or undefined cached elements
              if (
                ministry.id === undefined ||
                ministry.id === null ||
                !ministry.name
              ) {
                return null;
              }

              // 2. Map structural values to a validated, concrete type contract
              const validatedMinistry = {
                id: ministry.id,
                name: ministry.name,
                description: ministry.description,
              };

              return (
                <div
                  key={validatedMinistry.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-3 bg-gray-50/5"
                >
                  <div className="min-w-0 flex flex-col gap-y-0.5">
                    <h3 className="text-sm sm:text-base font-semibold truncate">
                      {validatedMinistry.name}
                    </h3>
                    {validatedMinistry.description && (
                      <p className="text-xs text-gray-400 truncate font-normal">
                        {validatedMinistry.description}
                      </p>
                    )}
                    <div className="mt-1">
                      <span className="inline-block font-mono text-[9px] sm:text-[10px] bg-gray-200/50 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-500 font-medium">
                        Row ID: {validatedMinistry.id}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-x-2 sm:self-center self-end">
                    <Button
                      size="sm"
                      onClick={() => handleEditSetup(validatedMinistry)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(validatedMinistry.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
