import { products } from "@/endpoints/product";
import { useQuery } from "@tanstack/react-query";

export const useGetProductItem = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: products,
  });
};

