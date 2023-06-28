import { NavigationContainer } from "@react-navigation/native";

import TabRoutes from "./TabRoutes";
import { StackLogin } from "./StackRoute";

export default function Routes() {
  return (
    <NavigationContainer>
      <StackLogin />
    </NavigationContainer>
  );
}
