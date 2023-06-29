import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import TabRoutes from "./TabRoutes";
import { StackLogin } from "./StackRoute";
import { DataContext } from "../context/DataContext";
import { Loading } from "../components/Loading/Loading";

export default function Routes() {
  const { dadosUsuario, loading } = useContext(DataContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {dadosUsuario !== "" ? <TabRoutes /> : <StackLogin />}
    </NavigationContainer>
  );
}

//   return (
//     <NavigationContainer>
//       <StackLogin />
//     </NavigationContainer>
//   );
// }
