import { ProductType } from "@data/product";
import { Storage } from "@services/storage";
import { useToast } from "native-base";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

interface ProductCartType extends ProductType {
  count: number;
}

interface CartContextType {
  products: ProductCartType[];
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
  getCoupon: (text: string) => void;
  reset: () => void;
  discountAmount: number;
  total: number;
  totalWithDiscount: number;
  count: number;
  COUPON_DISCOUNT: number;
  hasCoupon: boolean;
}

const CART_KEY = "cart";
const COUPON = "TONTOP";
const COUPON_DISCOUNT = 10;

const CartContext = createContext({} as CartContextType);

export const useCart = () => useContext(CartContext);

const CartContextProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ProductCartType[]>([]);
  const [hasCoupon, setHasCoupon] = useState(false);
  const toast = useToast();

  async function loadProductsFromStorage() {
    const products = await Storage.get(CART_KEY);

    if (products) setProducts(products);
  }

  function alertUser(status: "success" | "info", product: ProductType) {
    toast.closeAll();

    const verb = status === "success" ? "adicionado" : "removido";

    toast.show({ status, title: `${product.title} ${verb} com sucesso` });
  }

  function addOrRemoveCount(action: "add" | "remove", product: ProductType) {
    return (item: ProductCartType) => {
      if (item.id !== product.id) return item;

      const direction = action === "add" ? +1 : -1;

      return { ...item, count: item.count + direction };
    };
  }

  function addProduct(product: ProductType) {
    const productExists = products.find((p) => p.id === product.id);

    const newProducts: ProductCartType[] = productExists
      ? products.map(addOrRemoveCount("add", product))
      : [...products, { ...product, count: 1 }];

    setProducts(newProducts);
    alertUser("success", product);

    Storage.set(CART_KEY, newProducts);
  }

  function removeProduct(product: ProductType) {
    const productExists = products.find((p) => p.id === product.id);

    const shouldRemove = productExists && productExists.count > 1;

    const newProducts: ProductCartType[] = shouldRemove
      ? products.map(addOrRemoveCount("remove", product))
      : products.filter((p) => p.id !== product.id);

    setProducts(newProducts);
    alertUser("info", product);

    Storage.set(CART_KEY, newProducts);
  }

  function getDiscount(total: number) {
    const finalValue = hasCoupon
      ? total - (total * COUPON_DISCOUNT) / 100
      : total;

    return finalValue;
  }

  function getCoupon(text: string) {
    if (text !== COUPON)
      return toast.show({
        status: "error",
        title: "Cupom inválido",
        placement: "top",
      });

    setHasCoupon(true);
  }

  function reset() {
    setProducts([]);
    setHasCoupon(false);
  }

  useEffect(() => {
    loadProductsFromStorage();
  }, []);

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.count;
  }, 0);

  const totalWithDiscount = getDiscount(total);

  const discountAmount = total - totalWithDiscount;

  const count = products.reduce((total, product) => {
    return total + product.count;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        count,
        products,
        addProduct,
        removeProduct,
        total,
        COUPON_DISCOUNT,
        totalWithDiscount,
        discountAmount,
        getCoupon,
        hasCoupon,
        reset,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
