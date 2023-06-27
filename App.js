import Home from "./src/pages/Home/index";
import Login from "./src/pages/Login";
import Editora from "./src/pages/Editora";
import Livro from "./src/pages/Livro";
import HomeEditoras from "./src/pages/HomeEditoras";
import "react-native-gesture-handler";
import { DataProvider } from "./src/context/DataContext";
import { EditoraProvider } from "./src/context/EditoraContext";
import { LivroProvider } from "./src/context/LivroContext";
import StackRoutes from "./src/routes/StackRoute";
import Routes from "./src/routes";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <DataProvider>
      <EditoraProvider>
        <LivroProvider>
          <Routes />

          {/* screenOptions={{ headerShown: false }} */}
          {/* <Stack.Navigator screenOptions={{ headerShown: false }}> */}
          {/* <Drawer.Navigator useLegacyImplementation>
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, drawerItemStyle: { height: 0 } }}
            />
            <Drawer.Screen 
              name="Home"
              component={Home}
            />
            <Drawer.Screen
              name="Editora"
              component={Editora}
              options={{ headerShown: true, drawerItemStyle: { height: 0 } }}
            />
            <Drawer.Screen
              name="Livro"
              component={Livro}
              options={{ headerShown: true, drawerItemStyle: { height: 0 } }}
            />
            <Drawer.Screen
              name="Editoras"
              component={HomeEditoras}
              options={{ headerShown: true }}
            />
          </Drawer.Navigator> */}
        </LivroProvider>
      </EditoraProvider>
    </DataProvider>
  );
}
