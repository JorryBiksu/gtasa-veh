// features/home/service.js
import { getUserById, getSavehBySkip, getOrderBySkip } from "@/common/query/product";
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

const useQueryOorder = (skip, options) => {
  const queryClient = useQueryClient();

  return useQuery(
    [`get-oorder`, { skip }],
    () => getOrderBySkip(skip),
    {
      queryClient,
      ...options,
    }
  );
};

export { useQueryProducts, useQuerySaveeh,  useQueryOorder };
