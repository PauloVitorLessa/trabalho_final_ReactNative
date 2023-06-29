import React from "react";
import { useContext, useState } from "react";
import { View, FlatList, StyleSheet, Image, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataContext } from "../../context/DataContext";
import { EditoraContext } from "../../context/EditoraContext";

export default function HomeEditoras({ navigation }) {
  const { armazenarDadosEditora } = useContext(EditoraContext);
  const { listaEditoras } = useContext(DataContext);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const Item = ({ img, item }) => (
    <TouchableOpacity
      onPress={() => {
        setLoadingLogin(true);
        armazenarDadosEditora(item);
        navigation.navigate("Editora");
        setLoadingLogin(false);
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
      {loadingLogin ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <FlatList
            numColumns={2}
            data={listaEditoras}
            renderItem={({ item }) => (
              <Item img={item.img} nome={item.nomeEditora} item={item} />
            )}
            keyExtractor={(item) => item.codigoEditora}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#696462",
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
