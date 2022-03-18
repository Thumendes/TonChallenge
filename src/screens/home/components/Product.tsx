import { useCart } from "@contexts/cart";
import { ProductType } from "@data/product";
import { Feather } from "@expo/vector-icons";
import { Box, Button, IconButton, Image, Text, VStack } from "native-base";
import React from "react";

interface ProductProps {
  item: ProductType;
}

const Product: React.FC<ProductProps> = ({ item }) => {
  const { products, addProduct, removeProduct } = useCart();

  function renderButton() {
    const alreadyInCart = products.find((product) => product.id === item.id);

    const [color, text, action] = alreadyInCart
      ? ["red", "Remover", removeProduct]
      : ["green", "Adicionar", addProduct];

    return (
      <Button colorScheme={color} size="sm" onPress={() => action(item)}>
        {text}
      </Button>
    );
  }

  return (
    <Box h="full">
      <Box bg="white" px={2} roundedTop="lg">
        <Image h={150} source={{ uri: item.image }} alt={item.title} />
      </Box>

      <Box p={2} bg="gray.200" roundedBottom="lg">
        <VStack>
          <Text isTruncated>{item.title}</Text>
          <Text fontSize={16} fontWeight="bold">
            {item.price.toLocaleString("pt-br", {
              currency: "BRL",
              style: "currency",
            })}
          </Text>

          {renderButton()}
        </VStack>
      </Box>
    </Box>
  );
};

export default Product;
