import { useCart } from "@contexts/cart";
import { ProductType } from "@data/product";
import { Feather } from "@expo/vector-icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  VStack,
} from "native-base";
import React from "react";

interface ProductProps {
  item: ProductType;
}

const Product: React.FC<ProductProps> = ({ item }) => {
  const { addProduct } = useCart();

  return (
    <Box h="full">
      <Box bg="white" px={2} roundedTop="lg">
        <Image h={150} source={{ uri: item.image }} alt={item.title} />
      </Box>

      <Box p={2} bg="gray.200" roundedBottom="lg">
        <VStack>
          <Text isTruncated>{item.title}</Text>

          <Flex
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Text fontSize={20} fontWeight="bold">
              {item.price.toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
              })}
            </Text>

            <IconButton
              colorScheme="gray"
              variant="outline"
              onPress={() => addProduct(item)}
              _icon={{
                as: Feather,
                name: "shopping-cart",
                size: 5,
              }}
            />
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default Product;
