import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DetailScreen from "./screens/DetailScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuScreen"
        component={HomeScreen}
        options={{
          title: "Menu",
          headerStyle: { backgroundColor: "rgb(128, 72, 156)" },
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerStyle: { backgroundColor: "rgba(254,185,19,1)" },
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-outline" : "home-sharp";
            } else if (route.name === "Detail") {
              iconName = focused ? "menu-outline" : "menu-sharp";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "rgba(254,185,19,1)",
          tabBarInactiveTintColor: "gray",
        })}
      >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerStyle: { backgroundColor: "rgba(254,185,19,1)" } }}
      />
      <Tab.Screen
        name="Detail"
        component={Navigator}
        options={{ headerShown: false }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
