import { createStackNavigator } from "@react-navigation/stack";

import Editora from "../pages/Editora";
import HomeEditoras from "../pages/HomeEditoras";
import Livro from "../pages/Livro";
import TabRoutes from "./TabRoutes";
import Login from "../pages/Login";

const Stack = createStackNavigator();

export default function StackRoutes() {
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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen name="Editora" component={Editora} />
      <Stack.Screen name="Editoras" component={HomeEditoras} />
      <Stack.Screen name="Livro" component={Livro} />
    </Stack.Navigator>
  );
}
