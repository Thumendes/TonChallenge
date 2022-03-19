import React from "react";
import Layout from "@components/layout";
import { ScreenProps, StackParamList } from "@data/router";
import { useUtils } from "@hooks/useUtils";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Box,
  Button,
  Heading,
  Icon,
  Image,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useCart } from "@contexts/cart";

type ProductScreenRouteProp = RouteProp<StackParamList, "Product">;

interface ProductScreenProps extends ScreenProps<"Product"> {}

const ProductScreen: React.FC<ProductScreenProps> = ({}) => {
  const {
    params: { product },
  } = useRoute<ProductScreenRouteProp>();
  const { parseCurrency } = useUtils();
  const { addProduct } = useCart();

  return (
    <Layout>
      <ScrollView h="full">
        <Stack space={4}>
          <Box p={2} bg="white" rounded="lg" w="full" h="1/2">
            <Image
              w="full"
              h="full"
              source={{ uri: product.image }}
              alt={product.title}
            />
          </Box>

          <Heading>{product.title}</Heading>
          <Text>{product.description}</Text>
          <Heading size="xl">{parseCurrency(product.price)}</Heading>

          <Button
            size="lg"
            rightIcon={<Icon as={Feather} name="shopping-cart" size={5} />}
            onPress={() => addProduct(product)}
          >
            Adicionar ao carrinho
          </Button>
        </Stack>
      </ScrollView>
    </Layout>
  );
};

export default ProductScreen;
