import React from "react";
import Layout from "@components/layout";
import { ScreenProps } from "@data/router";
import ProductsGrid from "./components/ProductsGrid";
import { useProducts } from "@hooks/useProducts";
import { Alert, Text } from "native-base";

interface HomeScreenProps extends ScreenProps<"Home"> {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { products, error, load, loading } = useProducts();

  return (
    <Layout>
      {error && <Alert>{error}</Alert>}
      <ProductsGrid isLoading={loading} onRefresh={load} products={products} />
    </Layout>
  );
};

export default HomeScreen;
