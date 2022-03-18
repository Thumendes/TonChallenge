import React from "react";
import Layout from "@components/layout";
import { ScreenProps } from "@data/router";
import ProductsList from "./components/ProductsList";
import ProductsTotal from "./components/Total";
import { Divider } from "native-base";

interface CartScreenProps extends ScreenProps<"Cart"> {}

const CartScreen: React.FC<CartScreenProps> = ({}) => {
  return (
    <Layout>
      <ProductsList />
      <Divider />
      <ProductsTotal />
    </Layout>
  );
};

export default CartScreen;
