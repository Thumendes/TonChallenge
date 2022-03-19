import { useCart } from "@contexts/cart";
import { StackParamList } from "@data/router";
import { useUtils } from "@hooks/useUtils";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Flex, Stack, Text, VStack } from "native-base";
import React from "react";
import { Alert } from "react-native";

interface ProductsTotalProps {}

const ProductsTotal: React.FC<ProductsTotalProps> = ({}) => {
  const {
    total,
    hasCoupon,
    COUPON_DISCOUNT,
    reset,
    totalWithDiscount,
    discountAmount,
  } = useCart();
  const { navigate } = useNavigation<NavigationProp<StackParamList>>();
  const { parseCurrency } = useUtils();

  function handleBuy() {
    if (total === 0) {
      return Alert.alert("Carrinho vazio", "Adicione produtos ao carrinho");
    }

    Alert.alert("Compra com successo!");
    reset();
  }

  return (
    <VStack w="full" py={4} space={4}>
      {hasCoupon && (
        <VStack>
          <Flex w="full" direction="row" justifyContent="space-between">
            <Text fontSize={16} fontWeight="bold">
              Total sem desconto:
            </Text>
            <Text>{parseCurrency(total)}</Text>
          </Flex>

          <Flex w="full" direction="row" justifyContent="space-between">
            <Text fontSize={16} fontWeight="bold">
              Valor do desconto:
            </Text>
            <Text color="green.500">- {parseCurrency(discountAmount)}</Text>
          </Flex>
        </VStack>
      )}

      <Flex w="full" direction="row" justifyContent="space-between">
        <Stack>
          <Text fontSize={18} fontWeight="bold">
            Total:
          </Text>
        </Stack>

        <Stack alignItems="flex-end">
          <Text fontSize={22} fontWeight="bold">
            {parseCurrency(totalWithDiscount)}
          </Text>
        </Stack>
      </Flex>

      <Button onPress={handleBuy} colorScheme="green" size="lg">
        Continuar para pagamento
      </Button>

      <Button size="lg" onPress={() => navigate("Home")}>
        Continuar comprando
      </Button>
    </VStack>
  );
};

export default ProductsTotal;
