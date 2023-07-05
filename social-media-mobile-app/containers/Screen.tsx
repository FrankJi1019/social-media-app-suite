import { ContainerProps } from "../types/props";
import { FC, useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ScreenProps extends ContainerProps {
  style?: ViewStyle;
  title?: string;
  hideHeader?: boolean;
}

const Screen: FC<ScreenProps> = ({
  children,
  style,
  title = "IncognitoNet",
  hideHeader = false,
}) => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({ title, headerShown: !hideHeader });
  }, []);

  return <View style={[styles.screen, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default Screen;
