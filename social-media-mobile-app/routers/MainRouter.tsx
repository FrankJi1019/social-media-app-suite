import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screens } from "../routes/screens";
import HomeScreen from "../screens/HomeScreen";
import MomentsScreen from "../screens/MomentsScreen";
import PostMomentScreen from "../screens/PostMomentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const { Screen, Navigator } = createBottomTabNavigator();

const MainRouter = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.onPrimary,
          tabBarStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.onPrimary,
          headerStyle: { backgroundColor: theme.colors.primary },
        }}
      >
        <Screen
          name={Screens.HOME_SCREEN}
          component={HomeScreen}
          options={{
            tabBarLabel: "Buddies",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={"chatbubbles"} color={color} size={size} />
            ),
          }}
        />
        <Screen
          name={Screens.MOMENTS_SCREEN}
          component={MomentsScreen}
          options={{
            tabBarLabel: "Discover",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="stream" size={size} color={color} />
            ),
          }}
        />
        <Screen
          name={Screens.POST_MOMENT_SCREEN}
          component={PostMomentScreen}
          options={{
            tabBarLabel: "Share",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />
        <Screen
          name={Screens.PROFILE_SCREEN}
          component={ProfileScreen}
          options={{
            tabBarLabel: "Me",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
