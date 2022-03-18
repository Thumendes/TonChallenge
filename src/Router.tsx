import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "@screens/cart";
import HomeScreen from "@screens/home";
import { StackParamList } from "@data/router";
import { Button, IconButton, Text } from "native-base";

import { Feather } from "@expo/vector-icons";
import CartButton from "@components/cartButton";
import CartContextProvider from "@contexts/cart";

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
        </Stack.Navigator>
      </NavigationContainer>
    </CartContextProvider>
  );
};

export default Router;
