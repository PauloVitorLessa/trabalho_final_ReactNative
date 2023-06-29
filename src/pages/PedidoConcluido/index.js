import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

export default function PedidoConcluido({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.text}>Pedido Concluído(sqn)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#696462",
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 20,
    margin: 30,
  },
  logo: {
    width: 150,
    height: 150,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
