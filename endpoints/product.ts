import { ProductItem } from "@/lib/product-types";

export async function products(): Promise<ProductItem[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products: ProductItem[] = await response.json();
    return products;
  } catch (error) {
    console.error("There was a problem fetching the products:", error);
    throw error;
  }
}
