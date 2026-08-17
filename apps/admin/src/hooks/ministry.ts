import { ApolloSDK } from "@/graphql";
import { Reference } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

export function useGetMinistry(ministryId: string) {
  const result = useQuery(ApolloSDK.GetMinistryDocument, {
    variables: { id: ministryId },
    skip: !ministryId,
  });

  return {
    ministry: result.data?.ministry ?? null,
    loading: result.loading,
    error: result.error,
    refetch: result.refetch,
  };
}

export function useGetMinistries() {
  const result = useQuery(ApolloSDK.GetMinistriesDocument);

  return {
    ministries: result.data?.ministries ?? [],
    loading: result.loading,
    error: result.error,
    refetch: result.refetch,
  };
}

export function useCreateMinistry() {
  const [mutate, result] = useMutation(ApolloSDK.CreateMinistryDocument, {
    update(cache, { data }) {
      const ministry = data?.createMinistry;

      if (!ministry) {
        return;
      }

      cache.modify({
        fields: {
          ministries(existingRefs = [], { readField, toReference }) {
            const alreadyExists = existingRefs.some(
              (ref: Reference | undefined) =>
                readField("id", ref) === ministry.id,
            );

            if (alreadyExists) {
              return existingRefs;
            }

            const newRef = toReference(ministry);

            if (!newRef) {
              return existingRefs;
            }

            return [...existingRefs, newRef];
          },
        },
      });
    },
  });

  return {
    createMinistry: async (input: ApolloSDK.CreateMinistryInput) => {
      const result = await mutate({
        variables: { input },
      });

      return result.data?.createMinistry ?? null;
    },

    loading: result.loading,
    error: result.error,
  };
}

export function useUpdateMinistry() {
  const [mutate, result] = useMutation(ApolloSDK.UpdateMinistryDocument);

  return {
    updateMinistry: async (
      id: string,
      input: ApolloSDK.UpdateMinistryInput,
    ) => {
      const response = await mutate({
        variables: {
          id,
          input,
        },
      });

      return response.data?.updateMinistry ?? null;
    },

    loading: result.loading,
    error: result.error,
  };
}

export function useDeleteMinistry() {
  const [mutate, result] = useMutation(ApolloSDK.DeleteMinistryDocument, {
    update(cache, { data }) {
      const deletedId = data?.deleteMinistry?.id;

      if (!deletedId) {
        return;
      }

      cache.modify({
        fields: {
          ministries(existingRefs = [], { readField }) {
            return existingRefs.filter(
              (ref: Reference | undefined) =>
                readField("id", ref) !== deletedId,
            );
          },
        },
      });

      cache.evict({
        id: cache.identify({
          __typename: "Ministry",
          id: deletedId,
        }),
      });

      cache.gc();
    },
  });

  return {
    deleteMinistry: async (id: string) => {
      const response = await mutate({
        variables: { id },
      });

      return Boolean(response.data?.deleteMinistry);
    },

    loading: result.loading,
    error: result.error,
  };
}
