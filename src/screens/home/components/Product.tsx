import { useCart } from "@contexts/cart";
import { ProductType } from "@data/product";
import { StackParamList } from "@data/router";
import { Feather } from "@expo/vector-icons";
import { useUtils } from "@hooks/useUtils";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";

interface ProductProps {
  item: ProductType;
}

const Product: React.FC<ProductProps> = ({ item }) => {
  const { addProduct } = useCart();
  const { parseCurrency } = useUtils();
  const { navigate } = useNavigation<NavigationProp<StackParamList>>();

  return (
    <Pressable onPress={() => navigate("Product", { product: item })} h="full">
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
              {parseCurrency(item.price)}
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
    </Pressable>
  );
};

export default Product;
