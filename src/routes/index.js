import { NavigationContainer } from "@react-navigation/native";

//import StackRoutes from "./StackRoute";
import TabRoutes from "./TabRoutes";
//import DrawerRoutes from "./DrawerRoutes";

export default function Routes() {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}
