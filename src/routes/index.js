import { NavigationContainer } from "@react-navigation/native";

import TabRoutes from "./TabRoutes";

export default function Routes() {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}
