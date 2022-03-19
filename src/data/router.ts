import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductType } from "./product";

export type StackParamList = {
  Home: undefined;
  Cart: undefined;
  Product: { product: ProductType };
};

export type ScreenProps<
  RouteName extends keyof StackParamList = Extract<keyof StackParamList, string>
> = NativeStackNavigationProp<StackParamList, RouteName>;
