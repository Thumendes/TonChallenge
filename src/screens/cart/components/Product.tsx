import { useCart } from "@contexts/cart";
import { ProductType } from "@data/product";
import { Box, Button, Center, Flex, HStack, Image, Text } from "native-base";
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
    <HStack>
      <Box w="1/4" bg="#fff" rounded="lg" p={2}>
        <Image w={75} h={75} source={{ uri: item.image }} alt={item.title} />
      </Box>

      <Flex w="2/4" p={2}>
        <Text isTruncated maxW={200}>
          {item.title}
        </Text>
        <Text fontSize={16} fontWeight="bold">
          {item.price.toLocaleString("pt-br", {
            currency: "BRL",
            style: "currency",
          })}
        </Text>
      </Flex>

      <Center w="1/4">{renderButton()}</Center>
    </HStack>
  );
};

export default Product;
