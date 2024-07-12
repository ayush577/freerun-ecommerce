import { products } from "@/endpoints/product";
import { useQuery } from "@tanstack/react-query";

export const useGetProductItem = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: products,
    select: (data) => data.slice(0, 9)
  });
};
