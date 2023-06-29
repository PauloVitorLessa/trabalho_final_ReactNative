import React from "react";
import { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
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
  const { dadosUsuario } = useContext(DataContext);
  const { armazenarDadosLivro } = useContext(LivroContext);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [dadosLivros, setDadosLivros] = useState("");

  useEffect(() => {
    getTodosLivros();
    setLoadingLogin(true);
  }, []);

  const getTodosLivros = async () => {
    await AxiosInstance.get(
      "/livros",
      //Abaixo está pegando o Token da JWT
      { headers: { Authorization: `Bearer ${dadosUsuario?.token}` } }
    )
      .then((resultado) => {
        setDadosLivros(resultado.data);
        setLoadingLogin(false);
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
        {loadingLogin ? (
          <ActivityIndicator size={20} color="#FFF" alignItems="center" />
        ) : (
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  item: {
    marginRight: 10,
  },
  title: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignItems: "center",
  },
  tinyLogo: {
    width: 100,
    height: 150,
    resizeMode: "contain",
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  livros: {
    marginLeft: 10,
    marginRight: 10,
  },
});
