import React from "react";
import { useContext, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import CardLivroHorizontal from "../../components/CardLivro/CardLivroHorizontal";
import { save, getValueFor, deleteValue } from "../../services/DataService";
import CardCarrinho from "../../components/CardLivro/CardCarrinho";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Carrinho() {
  const [livrosCarrinhoDB, setLivrosCarrinhoDB] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const livrosCarrinho = await getValueFor("carrinho");
        setLivrosCarrinhoDB(livrosCarrinho);
      })();
    }, [])
  );

  // useEffect(() => {
  //   console.log("carregou carrinho:");
  //   (async () => {
  //     const livrosCarrinho = await getValueFor("carrinho");
  //     setLivrosCarrinhoDB(livrosCarrinho);
  //   })();
  //   //getCarrinhoFromDB().then((livros) => setLivrosCarrinhoDB(livros));
  // }, []);

  const getCarrinhoFromDB = async () => {
    await getValueFor("carrinho");
    //const livrosCarrinho = await getValueFor("carrinho");
    //setLivrosCarrinhoDB(livrosCarrinho);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text>Produtos</Text>
          <Text>Carrinho</Text>
        </View>
        <TouchableOpacity style={styles.trashButton}>
          <FontAwesome name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={livrosCarrinhoDB}
          renderItem={({ item }) => (
            <CardCarrinho
              codigoLivro={item.codigoLivro}
              title={item.title}
              quantidade={item.quantidade}
            ></CardCarrinho>
          )}
          keyExtractor={(item) => item.codigoLivro}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  cardInfo: {
    width: windowWidth / 2 - 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  cardDescription: {
    //fontSize: 20,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  imageCardLivro: {
    width: windowWidth / 2,
    height: 230,
    resizeMode: "contain",
  },
  content: {
    marginTop: 40,
    flexDirection: "row",
    alignSelf: "center",
  },
  botao: {
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
});
