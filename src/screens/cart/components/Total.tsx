import { useCart } from "@contexts/cart";
import { Button, Flex, Text, VStack } from "native-base";
import React from "react";

interface ProductsTotalProps {}

const ProductsTotal: React.FC<ProductsTotalProps> = ({}) => {
  const { total } = useCart();

  function renderTotal() {
    return total.toLocaleString("pt-br", {
      currency: "BRL",
      style: "currency",
    });
  }

  return (
    <VStack w="full" py={4} space={4}>
      <Flex w="full" direction="row" justifyContent="space-between">
        <Text fontSize={16} fontWeight="bold">
          Total:
        </Text>
        <Text fontSize={20} fontWeight="bold">
          {renderTotal()}
        </Text>
      </Flex>

      <Button colorScheme="green" size="lg">
        Continuar para pagamento
      </Button>
    </VStack>
  );
};

export default ProductsTotal;
