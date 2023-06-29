import { createStackNavigator } from "@react-navigation/stack";

import Editora from "../pages/Editora";
import HomeEditoras from "../pages/HomeEditoras";
import Livro from "../pages/Livro";
import PedidoConcluido from "../pages/PedidoConcluido";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Carrinho from "../pages/Carrinho/Index";
import { useContext } from "react";
import { EditoraContext } from "../context/EditoraContext";

const Stack = createStackNavigator();

export function StackLogin() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff8f7",
        },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export function StackCarrinho() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff8f7",
        },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="carrinhoStack"
        component={Carrinho}
        options={{ headerShown: true, headerLeft: () => null }}
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
  const { dadosEditora } = useContext(EditoraContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff8f7",
          height: 80,
        },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Livraria G3", headerLeft: () => null }}
      />
      <Stack.Screen
        name="EditoraStack"
        component={Editora}
        options={{ title: `${dadosEditora.nomeEditora}` }}
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
  const { dadosEditora } = useContext(EditoraContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff8f7",
        },
        headerTintColor: "black",
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
        options={{ title: `${dadosEditora.nomeEditora}` }}
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
