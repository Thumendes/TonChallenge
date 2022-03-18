import React from "react";
import { StackParamList } from "@data/router";
import { Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Badge, Box, HStack, IconButton } from "native-base";
import { useCart } from "@contexts/cart";

interface CartButtonProps {}

const CartButton: React.FC<CartButtonProps> = ({}) => {
  const { navigate } = useNavigation<NavigationProp<StackParamList>>();
  const { products } = useCart();

  return (
    <>
      {products.length > 0 && (
        <Badge
          position="absolute"
          colorScheme="danger"
          rounded="full"
          zIndex={1}
          variant="solid"
          pointerEvents="none"
          top={-4}
          right={-4}
        >
          {products.length}
        </Badge>
      )}
      <IconButton
        onPress={() => navigate("Cart")}
        icon={<Feather size={20} name="shopping-cart" />}
      />
    </>
  );
};

export default CartButton;
