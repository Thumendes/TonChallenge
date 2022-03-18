import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  Home: undefined;
  Cart: undefined;
};

export type ScreenProps<RouteName extends keyof StackParamList> =
  NativeStackNavigationProp<StackParamList, RouteName>;
