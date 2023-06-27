import React from "react";
import { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LivroContext } from "../../context/LivroContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Item = ({ img, nav, item, func }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      console.log("funcao");
      console.log(func);
      func(item);
      nav.navigate("Livro");
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

export default function LivrosRecentes({ navigation }) {
  console.log(navigation);
  const { dadosUsuario } = useContext(DataContext);
  const { armazenarDadosLivro } = useContext(LivroContext);

  const [dadosLivros, setDadosLivros] = useState("");

  useEffect(() => {
    getTodosLivros();
  }, []);

  const getTodosLivros = async () => {
    await AxiosInstance.get(
      "/livros",
      //Abaixo está pegando o Token da JWT
      { headers: { Authorization: `Bearer ${dadosUsuario?.token}` } }
    )
      .then((resultado) => {
        console.log("getTodosLivros" + JSON.stringify(resultado.data));
        setDadosLivros(resultado.data);
      })
      .catch((error) => {
        console.log(
          "Ocorreu um erro ao recuperar os dados dos livros: " + error
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECENTES</Text>
      <View style={styles.livros}>
        <FlatList
          data={dadosLivros}
          renderItem={({ item }) => (
            <Item
              img={item.img}
              nav={navigation}
              nome={item.nomeEditora}
              item={item}
              func={armazenarDadosLivro}
            />
          )}
          keyExtractor={(item) => item.codigoLivro}
          horizontal={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //gap: 4,
  },
  item: {
    backgroundColor: "black",
    marginRight: 10,
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    //flex: 1,
    alignItems: "center",
  },
  tinyLogo: {
    width: windowWidth / 2 - 70,
    height: 150,
    marginBottom: 20,
    backgroundColor: "black",
    resizeMode: "contain",
  },
  livros: {
    margin: 10,
  },
});
