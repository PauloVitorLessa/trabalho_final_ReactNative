import React from "react";
import { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { DataContext } from "../../context/DataContext";
import { FontAwesome } from "@expo/vector-icons";
import { save, getValueFor } from "../../services/DataService";
import CardFavoritos from "../../components/CardLivro/CardFavoritos";

const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

export default function Favoritos({ navigation }) {
  const [livrosFavoritosDB, setLivrosFavoritosDB] = useState([]);
  const [selectedBook, setSelectedBook] = React.useState("");
  const { setQtdFavoritos, qtdFavoritos } = useContext(DataContext);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const livrosFavoritos = await getValueFor("favoritos");
        setLivrosFavoritosDB(livrosFavoritos);
      })();
    }, [])
  );
  // const handleButton = async () => {
  //   if (livrosCarrinhoDB && livrosCarrinhoDB.length !== 0) {
  //     await deleteValue("carrinho");
  //     setQtdCarrinho(0);
  //     navigation.navigate("PedidoFinalizado");
  //   }
  // };

  const handleOnPress = (item) => {
    setSelectedBook(item);
  };
  const handleTrash = async () => {
    if (selectedBook) {
      console.log("selected book :" + JSON.stringify(selectedBook));
      try {
        let resultArray = [];
        let result = await getValueFor("favoritos");
        console.log("result :" + JSON.stringify(result));
        if (result) {
          resultArray = result;
          console.log("array from db :" + JSON.stringify(resultArray));

          resultArray = resultArray.filter(
            (element) => element.codigoLivro !== selectedBook.codigoLivro
          );

          console.log("arrey to db :" + JSON.stringify(resultArray));

          await save("favoritos", resultArray);
          setQtdFavoritos(qtdFavoritos - 1);
          setLivrosFavoritosDB(resultArray);
        }
      } catch (error) {
        console.log("erro ao persistir dados no addItem:" + error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.cardTitle}>Favoritos</Text>
          <Text style={styles.text}>Produtos</Text>
        </View>
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => handleTrash()}
        >
          <FontAwesome name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={livrosFavoritosDB}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleOnPress(item)}
              style={
                selectedBook.codigoLivro === item.codigoLivro
                  ? styles.btnActive
                  : styles.btn
              }
            >
              <CardFavoritos
                codigoLivro={item.codigoLivro}
                title={item.title}
                quantidade={item.quantidade}
              ></CardFavoritos>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.codigoLivro}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#696462",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardInfo: {
    width: windowWidth / 2 - 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 25,
    color: "white",
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: "white",
    marginBottom: 10,
  },
  cardDescription: {
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
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botao: {
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#F95C47",
    borderRadius: 5,
  },
  trashButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  flatlistContainer: {
    height: 300,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderTopColor: "white",
    borderTopWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
  },
  total: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pagamento: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pix: {
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
  },
  cartao: {
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#f95c47",
    marginTop: 10,
    width: 270,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  btnActive: {
    backgroundColor: "#2D2033",
  },
  buttonText: {
    fontWeight: "bold",
    color: "black",
  },
});
