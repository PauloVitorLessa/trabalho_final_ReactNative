import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Badge } from "@rneui/base";
import { DataContext } from "../context/DataContext";

import {
  StackCarrinho,
  StackEditoras,
  StackHome,
  StackLogin,
  StackFavoritos,
} from "./StackRoute";

import { Text, View } from "react-native";
import React, { useContext } from "react";

//import { View } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { qtdFavoritos, qtdCarrinho } = useContext(DataContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#f95c47",
        tabBarInactiveTintColor: "#4a4645",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Tab"
        component={StackHome}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="EditorasStack"
        component={StackEditoras}
        options={{
          title: "Editoras",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-library" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={StackFavoritos}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              <FontAwesome name="heart" color={color} size={size} />
              <Badge
                badgeStyle={{ backgroundColor: "#f95c47" }}
                value={qtdFavoritos}
                containerStyle={{ position: "absolute", top: -4, right: -10 }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Carrinho"
        component={StackCarrinho}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialIcons name="shopping-cart" color={color} size={size} />
              <Badge
                badgeStyle={{ backgroundColor: "#f95c47" }}
                value={qtdCarrinho}
                containerStyle={{ position: "absolute", top: -4, right: -10 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Sair"
        component={StackLogin}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
