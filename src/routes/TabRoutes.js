import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { StackCarrinho, StackEditoras, StackHome } from "./StackRoute";

//import Home from "../pages/Home";
import Login from "../pages/Login";
import Carrinho from "../pages/Carrinho/Index";
import HomeEditoras from "../pages/HomeEditoras";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#696462",
        tabBarInactiveTintColor: "#4a4645",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          headerLeft: () => null
        }}
      />
      <Tab.Screen
        name="Editoras"
        component={StackEditoras}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-library" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={StackCarrinho}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sair"
        component={""}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
