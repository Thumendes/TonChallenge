import { useCart } from "@contexts/cart";
import { Box, Flex, Text } from "native-base";
import React from "react";

interface ProductsTotalProps {}

const ProductsTotal: React.FC<ProductsTotalProps> = ({}) => {
  const { products } = useCart();

  function renderTotal() {
    const totalValue = products.reduce((total, product) => {
      return total + product.price;
    }, 0);

    return totalValue.toLocaleString("pt-br", {
      currency: "BRL",
      style: "currency",
    });
  }

  return (
    <Flex py={4} direction="row" justifyContent="space-between" w="full">
      <Text fontSize={16} fontWeight="bold">
        Total:
      </Text>
      <Text fontSize={20} fontWeight="bold">
        {renderTotal()}
      </Text>
    </Flex>
  );
};

export default ProductsTotal;
