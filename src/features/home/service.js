// features/home/service.js
import { getUserById, getSavehBySkip } from "@/common/query/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useQueryProducts = (skip, options) => {
  const queryClient = useQueryClient();

  return useQuery(
    ["get-user", { skip }],
    () => getUserById(skip),
    {
      queryClient,
      ...options,
    }
  );
};

const useQuerySaveeh = (skip, options) => {
  const queryClient = useQueryClient();

  return useQuery(
    [`get-saveeh`, { skip }],
    () => getSavehBySkip(skip),
    {
      queryClient,
      ...options,
    }
  );
};

export { useQueryProducts, useQuerySaveeh };
