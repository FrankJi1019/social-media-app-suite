import {
  View,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import Screen from "../../containers/Screen";
import { useTheme, Text } from "react-native-paper";
import { useState, useCallback } from "react";
import SignInForm from "../../components/SignInForm";
import RegisterForm from "../../components/RegisterForm";
import { FC } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface ProfileScreenProps {
  onSignIn: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
}

const ProfileScreen: FC<ProfileScreenProps> = ({ onSignIn, onRegister }) => {
  const theme = useTheme();
  const tabBarHeight = useBottomTabBarHeight();

  const [form, setForm] = useState<"sign-in" | "register">("sign-in");

  const switchSignInFormHandler = useCallback(() => {
    setForm("sign-in");
  }, [setForm]);

  const switchRegisterFormHandler = useCallback(() => {
    setForm("register");
  }, [setForm]);

  return (
    <Screen hideHeader>
      <ScrollView>
        <KeyboardAvoidingView
          style={{
            minHeight: Dimensions.get("screen").height - tabBarHeight,
          }}
          behavior="position"
        >
          <View style={{ height: "100%" }}>
            <View
              style={{
                height: "30%",
                backgroundColor: theme.colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                variant="headlineLarge"
                style={{ color: theme.colors.onPrimary }}
              >
                Welcome to IncognitoNet
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: theme.colors.onPrimary,
              }}
            >
              <Pressable style={{ flex: 1 }} onPress={switchSignInFormHandler}>
                <View style={{ paddingVertical: 12, alignItems: "center" }}>
                  <Text
                    variant="bodyLarge"
                    style={{
                      color: form === "sign-in" ? theme.colors.primary : "#999",
                      fontWeight: form === "sign-in" ? "bold" : "normal",
                    }}
                  >
                    Sign In
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{ flex: 1 }}
                onPress={switchRegisterFormHandler}
              >
                <View style={{ paddingVertical: 12, alignItems: "center" }}>
                  <Text
                    variant="bodyLarge"
                    style={{
                      color:
                        form === "register" ? theme.colors.primary : "#999",
                      fontWeight: form === "register" ? "bold" : "normal",
                    }}
                  >
                    Register
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={{ flex: 1 }}>
              {form === "sign-in" ? (
                <SignInForm
                  onSignIn={onSignIn}
                  onSwitchForm={switchRegisterFormHandler}
                />
              ) : (
                <RegisterForm
                  onRegister={onRegister}
                  onSwitchForm={switchSignInFormHandler}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Screen>
  );
};

export default ProfileScreen;
