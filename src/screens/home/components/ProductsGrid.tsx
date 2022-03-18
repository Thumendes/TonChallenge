import Product from "./Product";
import { ProductType } from "@data/product";
import { Box, FlatList } from "native-base";
import React from "react";

interface GridProps {
  products: ProductType[];
}

const ProductsGrid: React.FC<GridProps> = ({ products }) => {
  return (
    <Box w="full">
      <FlatList
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
