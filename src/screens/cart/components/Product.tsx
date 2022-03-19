import { useCart } from "@contexts/cart";
import { ProductType } from "@data/product";
import { StackParamList } from "@data/router";
import { Feather } from "@expo/vector-icons";
import { useUtils } from "@hooks/useUtils";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
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
  const { products, addProduct, removeProduct } = useCart();
  const { parseCurrency } = useUtils();
  const { navigate } = useNavigation<NavigationProp<StackParamList>>();

  function renderButton() {
    const product = products.find((product) => product.id === item.id);

    if (!product) return <></>;

    const count = `${product.count}x`;

    return (
      <Center>
        <Text fontWeight="bold" mb={2}>
          {count}
        </Text>

        <Button.Group isAttached size="sm">
          <IconButton
            variant="solid"
            _icon={{ as: Feather, name: "minus", size: 5 }}
            onPress={() => removeProduct(item)}
          />
          <IconButton
            variant="solid"
            _icon={{ as: Feather, name: "plus", size: 5 }}
            onPress={() => addProduct(item)}
          />
        </Button.Group>
      </Center>
    );
  }

  return (
    <Pressable onPress={() => navigate("Product", { product: item })}>
      <HStack>
        <Box w="1/4" bg="#fff" rounded="lg" p={2}>
          <Image w={75} h={75} source={{ uri: item.image }} alt={item.title} />
        </Box>

        <Flex w="2/4" p={2}>
          <Text isTruncated maxW={200}>
            {item.title}
          </Text>

          <Text fontSize={16} fontWeight="bold">
            {parseCurrency(item.price)}
          </Text>
        </Flex>

        <Center w="1/4">{renderButton()}</Center>
      </HStack>
    </Pressable>
  );
};

export default Product;
