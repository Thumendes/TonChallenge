import React from "react";
import Layout from "@components/layout";
import { ScreenProps } from "@data/router";
import ProductsGrid from "./components/ProductsGrid";
import { useProducts } from "@hooks/useProducts";

interface HomeScreenProps extends ScreenProps<"Home"> {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { products, error, loading } = useProducts();

  return (
    <Layout>
      <ProductsGrid products={products} />
    </Layout>
  );
};

export default HomeScreen;
