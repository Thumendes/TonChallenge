import { ProductType } from "@data/product";
import { ProductsService } from "@services/products";
import { useEffect, useState } from "react";

const productsService = ProductsService.create();

export function useProducts(id?: number) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    const products = await productsService.findAll();
    setProducts(products);

    return products;
  }

  async function loadProduct(id: number) {
    const product = await productsService.findById(id);
    setProduct(product);

    return product;
  }

  useEffect(() => {
    setLoading(true);
    setError(null);

    const promise = id ? loadProduct(id) : loadProducts();

    promise.catch(setError).finally(() => setLoading(false));
  }, []);

  return { products, product, loading, error };
}
