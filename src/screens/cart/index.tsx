import React from "react";
import Layout from "@components/layout";
import { ScreenProps } from "@data/router";
import ProductsList from "./components/ProductsList";
import ProductsTotal from "./components/Total";
import { Divider } from "native-base";
import CouponSection from "./components/Coupon";

interface CartScreenProps extends ScreenProps<"Cart"> {}

const CartScreen: React.FC<CartScreenProps> = ({}) => {
  return (
    <Layout>
      <ProductsList />
      <Divider />
      <CouponSection />
      <Divider />
      <ProductsTotal />
    </Layout>
  );
};

export default CartScreen;
