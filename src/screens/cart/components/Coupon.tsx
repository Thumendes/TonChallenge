import { useCart } from "@contexts/cart";
import { Button, Flex, FormControl, Input } from "native-base";
import React, { useState } from "react";

interface CouponSectionProps {}

const CouponSection: React.FC<CouponSectionProps> = ({}) => {
  const [couponText, setCouponText] = useState("");
  const { getCoupon, hasCoupon, total } = useCart();

  function setCoupon() {
    getCoupon(couponText);
    setCouponText("");
  }

  if (total === 0) return null;

  return (
    <Flex
      alignItems="flex-end"
      w="full"
      my={6}
      direction="row"
      justifyContent="space-between"
    >
      <FormControl isDisabled={hasCoupon} w="1/2">
        <FormControl.Label>Cupom de desconto</FormControl.Label>
        <Input
          onChangeText={setCouponText}
          size="lg"
          placeholder="Tente com TONTOP"
        />
      </FormControl>

      <Button isDisabled={hasCoupon} onPress={setCoupon}>
        Inserir
      </Button>
    </Flex>
  );
};

export default CouponSection;
