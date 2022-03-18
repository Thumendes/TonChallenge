import React from "react";
import { Center } from "native-base";
import { SafeAreaView } from "react-native";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SafeAreaView>
      <Center p={4}>{children}</Center>
    </SafeAreaView>
  );
};

export default Layout;
