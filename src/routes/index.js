import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./StackRoute";

export default function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}
