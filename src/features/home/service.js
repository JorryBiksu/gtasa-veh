import { getUserById } from "@/common/query/product";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./query";

const useQueryProdutcts = (skip, options) => {
  return useQuery(
    [`get-user`, { skip }],
    () => getUserById(skip),
    {
      ...options
    }
  );
}

export {
  useQueryProdutcts
}