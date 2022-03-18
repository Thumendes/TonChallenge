import { ProductType } from "@data/product";
import { Storage } from "@services/storage";
import { useToast } from "native-base";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ProductCartType extends ProductType {
  count: number;
}

interface CartContextType {
  products: ProductCartType[];
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
  total: number;
  count: number;
}

const CART_KEY = "cart";

const CartContext = createContext({} as CartContextType);

export const useCart = () => useContext(CartContext);

const CartContextProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ProductCartType[]>([]);
  const toast = useToast();

  async function loadProductsFromStorage() {
    const products = await Storage.get(CART_KEY);

    if (products) setProducts(products);
  }

  function addProduct(product: ProductType) {
    const productExists = products.find((p) => p.id === product.id);

    const newProducts: ProductCartType[] = productExists
      ? products.map((item) => {
          if (item.id !== product.id) return item;

          return { ...item, count: item.count + 1 };
        })
      : [...products, { ...product, count: 1 }];

    setProducts(newProducts);
    toast.show({
      title: `${product.title} adicionado ao carrinho!`,
      status: "success",
    });

    Storage.set(CART_KEY, newProducts);
  }

  function removeProduct(product: ProductType) {
    const productExists = products.find((p) => p.id === product.id);

    const shouldRemove = productExists && productExists.count > 1;

    const newProducts: ProductCartType[] = shouldRemove
      ? products.map((item) => {
          if (item.id !== product.id) return item;

          return { ...item, count: item.count - 1 };
        })
      : products.filter((p) => p.id !== product.id);

    setProducts(newProducts);
    toast.show({
      title: `${product.title} removido do carrinho!`,
      status: "info",
    });

    Storage.set(CART_KEY, newProducts);
  }

  useEffect(() => {
    loadProductsFromStorage();
  }, []);

  const total = products.reduce((total, product) => {
    const value = product.price * product.count;

    return total + value;
  }, 0);

  const count = products.reduce((total, product) => {
    return total + product.count;
  }, 0);

  return (
    <CartContext.Provider
      value={{ count, products, addProduct, removeProduct, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
