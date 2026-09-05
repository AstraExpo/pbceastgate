import { useForm } from "@tanstack/react-form";
import { ZodType } from "zod";

interface AppFormOptions<TValues extends Record<string, unknown>> {
  defaultValues: TValues;
  schema: ZodType<TValues>;
  onSubmit: (values: TValues) => Promise<void> | void;
}

export function useAppForm<TValues extends Record<string, unknown>>({
  defaultValues,
  schema,
  onSubmit,
}: AppFormOptions<TValues>) {
  return useForm({
    defaultValues,
    validators: {
      onSubmit: ({ value }) => {
        const result = schema.safeParse(value);

        if (!result.success) {
          const errors: Record<string, string> = {};

          for (const issue of result.error.issues) {
            const path = issue.path.join(".");
            if (path) {
              errors[path] = issue.message;
            }
          }

          return errors;
        }

        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
}
