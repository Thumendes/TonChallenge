import Product from "./Product";
import { ProductType } from "@data/product";
import { Box, FlatList } from "native-base";
import React from "react";

interface GridProps {
  products: ProductType[];
  onRefresh: () => void;
  isLoading: boolean;
}

const ProductsGrid: React.FC<GridProps> = ({
  isLoading,
  onRefresh,
  products,
}) => {
  return (
    <Box w="full">
      <FlatList
        onRefresh={onRefresh}
        refreshing={isLoading}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        data={products}
        renderItem={({ item }) => (
          <Box w="1/2" h={280} p={2}>
            <Product item={item} />
          </Box>
        )}
      />
    </Box>
  );
};

export default ProductsGrid;
