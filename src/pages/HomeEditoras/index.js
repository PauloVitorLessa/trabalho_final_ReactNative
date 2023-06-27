import React from "react";
import { useContext, useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataContext } from "../../context/DataContext";
import AxiosInstance from "../../api/AxiosInstance";
import { EditoraContext } from "../../context/EditoraContext";

export default function HomeEditoras({ navigation }) {
  const { armazenarDadosEditora } = useContext(EditoraContext);
  const { dadosUsuario } = useContext(DataContext);
  const { listaEditoras } = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState("");
  const Item = ({ img, item }) => (
    <TouchableOpacity
      onPress={() => {
        armazenarDadosEditora(item);
        navigation.navigate("Editora");
      }}
    >
      <Image
        style={styles.tinyLogo}
        source={{
          uri: `data:image/png;base64,${img}`,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDITORAS</Text>
      <FlatList
        numColumns={2}
        data={listaEditoras}
        renderItem={({ item }) => (
          <Item img={item.img} nome={item.nomeEditora} item={item} />
        )}
        keyExtractor={(item) => item.codigoEditora}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    alignItems: "center",
  },
  tinyLogo: {
    margin: 10,
    width: 100,
    height: 100,
  },
});
