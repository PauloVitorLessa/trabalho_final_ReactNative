import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import {
  StackCarrinho,
  StackEditoras,
  StackHome,
  StackLogin,
} from "./StackRoute";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
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
