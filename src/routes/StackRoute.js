import { createStackNavigator } from "@react-navigation/stack";

import Editora from "../pages/Editora";
import HomeEditoras from "../pages/HomeEditoras";
import Livro from "../pages/Livro";
import PedidoConcluido from "../pages/PedidoConcluido";
import TabRoutes from "./TabRoutes";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Carrinho from "../pages/Carrinho/Index";

const Stack = createStackNavigator();

export function StackLogin() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Home"
        component={TabRoutes}
        options={{ title: "Livraria G4", headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
}

export function StackCarrinho() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "red",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Carrinho"
        component={Carrinho}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PedidoFinalizado"
        component={PedidoConcluido}
        options={{
          headerShown: false,
          title: "Pedido Finalizado",
        }}
      />
    </Stack.Navigator>
  );
}
export function StackHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#696462",
          height: 60,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Livraria G3", headerLeft: () => null }}
      />
      <Stack.Screen
        name="Editora"
        component={Editora}
        options={{ title: "Editora X" }}
      />
      <Stack.Screen
        name="Livro"
        component={Livro}
        options={{ title: "Livraria G3" }}
      />
    </Stack.Navigator>
  );
}

export function StackEditoras() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Editoras"
        component={HomeEditoras}
        options={{ title: "Editoras", headerLeft: () => null }}
      />
      <Stack.Screen
        name="Editora"
        component={Editora}
        options={{ title: "Editora X" }}
      />
      <Stack.Screen
        name="Livro"
        component={Livro}
        options={{ title: "Livraria G3" }}
      />
    </Stack.Navigator>
  );
}

// <Stack.Screen name="Home" component={Home} />
// <Stack.Screen name="Editora" component={Editora} />
// <Stack.Screen name="Editoras" component={HomeEditoras} />
// <Stack.Screen name="Livro" component={Livro} />
// <Stack.Screen name="pedidoConcluido" component={PedidoConcluido} />
