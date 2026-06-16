import { ApolloSDK } from "@/graphql";

/**
 * Hook to retrieve a single ministry by its ID.
 * Explicitly types the variables payload to satisfy the non-optional baseOptions schema requirement.
 */
export function useGetMinistry(ministryId: number) {
  const queryVariables: ApolloSDK.GetMinistryQueryVariables = {
    id: ministryId,
  };

  const { data, loading, error } = ApolloSDK.useGetMinistryQuery({
    skip: !ministryId,
    variables: queryVariables,
  });

  return {
    ministry: data?.ministry ?? null,
    isPending: loading,
    error,
  };
}

/**
 * Hook to retrieve all ministries.
 * Follows the pre-bound generic signature since no runtime query variables are required.
 */
export function useGetMinistries() {
  const { data, loading, error } = ApolloSDK.useGetMinistriesQuery();

  return {
    ministries: data?.ministries ?? [],
    isPending: loading,
    error,
  };
}

/**
 * Hook to create a new ministry and manually append it to the cache layout.
 */
export function useCreateMinistry() {
  const [createMinistryMutation, { loading }] =
    ApolloSDK.useCreateMinistryMutation({
      update: (cache, { data }) => {
        const newMinistry = data?.createMinistry;
        if (!newMinistry) return;

        cache.modify({
          fields: {
            // Explicitly typing existing references avoids nested inference dropouts
            ministries: (existing = []) => {
              return [...existing, newMinistry];
            },
          },
        });
      },
    });

  const createMinistry = async (input: ApolloSDK.CreateMinistryInput) => {
    // Explicitly type the variables object using the generated mutation variable contract
    const mutationVariables: ApolloSDK.CreateMinistryMutationVariables = {
      input,
    };

    return createMinistryMutation({
      variables: mutationVariables,
    });
  };

  return {
    createMinistry,
    isPending: loading,
  };
}

/**
 * Hook to update an existing ministry.
 * Refetched variables are explicitly typed to satisfy the strict mutation tuple contract.
 */
export function useUpdateMinistry() {
  const [updateMinistryMutation, { loading, error }] =
    ApolloSDK.useUpdateMinistryMutation();

  const updateMinistry = async (
    id: number,
    input: ApolloSDK.UpdateMinistryInput,
  ) => {
    const mutationVariables: ApolloSDK.UpdateMinistryMutationVariables = {
      input,
      id,
    };

    return updateMinistryMutation({
      variables: mutationVariables,
    });
  };

  return {
    updateMinistry,
    isPending: loading,
    error,
  };
}

/**
 * Hook to delete a ministry record and evict it from the localized cache layout.
 * Corrects the invalid runtime syntax and applies explicit variable typing.
 */
export function useDeleteMinistry() {
  const [deleteMinistryMutation, { loading, error }] =
    ApolloSDK.useDeleteMinistryMutation();

  const deleteMinistry = async (id: number) => {
    const mutationVariables: ApolloSDK.DeleteMinistryMutationVariables = {
      id,
    };

    return deleteMinistryMutation({
      variables: mutationVariables,
      update: cache => {
        // Globally evict the object using its normalized cache identifier
        cache.evict({ id: cache.identify({ __typename: "Ministry", id }) });
        // Run garbage collection to purge dead references from parent arrays (e.g., ministries list)
        cache.gc();
      },
    });
  };

  return {
    deleteMinistry,
    isPending: loading,
    error,
  };
}
