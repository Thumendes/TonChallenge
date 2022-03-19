import { useCart } from "@contexts/cart";
import { Box, Divider, FlatList, Spacer, Text } from "native-base";
import React from "react";
import Product from "./Product";

interface ProductsListProps {}

const ProductsList: React.FC<ProductsListProps> = ({}) => {
  const { products } = useCart();

  return (
    <FlatList
    maxH="1/2"
      keyExtractor={(item) => String(item.id)}
      data={products}
      renderItem={({ item }) => (
        <Box w="full" py={2}>
          <Product item={item} />
        </Box>
      )}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
};

export default ProductsList;
