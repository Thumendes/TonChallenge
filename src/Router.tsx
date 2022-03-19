import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StackParamList } from "@data/router";
import CartButton from "@components/cartButton";
import CartContextProvider from "@contexts/cart";

import CartScreen from "@screens/cart";
import HomeScreen from "@screens/home";
import ProductScreen from "@screens/product";

interface RouterProps {}

const Stack = createNativeStackNavigator<StackParamList>();

const Router: React.FC<RouterProps> = ({}) => {
  return (
    <CartContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerRight: CartButton }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerTitle: "Produtos" }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerTitle: "Carrinho" }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{ headerTitle: "Produtos" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContextProvider>
  );
};

export default Router;
