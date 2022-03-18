import { ProductType } from "@data/product";
import { Storage } from "@services/storage";
import React, { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  products: ProductType[];
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
}

const CART_KEY = "cart";

const CartContext = createContext({} as CartContextType);

export const useCart = () => useContext(CartContext);

const CartContextProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  async function loadProductsFromStorage() {
    const products = await Storage.get(CART_KEY);

    if (products) setProducts(products);
  }

  function addProduct(product: ProductType) {
    const newProducts = [...products, product];

    setProducts(newProducts);

    Storage.set(CART_KEY, newProducts);
  }

  function removeProduct(product: ProductType) {
    const newProducts = products.filter((p) => p.id !== product.id);

    setProducts(newProducts);

    Storage.set(CART_KEY, newProducts);
  }

  useEffect(() => {
    loadProductsFromStorage();
  }, []);

  return (
    <CartContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
