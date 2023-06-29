import React from "react";
import { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getValueFor, addItem } from "../../services/DataService";
import { LivroContext } from "../../context/LivroContext";
import { DataContext } from "../../context/DataContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Livro() {
  const { dadosLivro } = useContext(LivroContext);
  const { setQtdCarrinho, qtdCarrinho, setQtdFavoritos, qtdFavoritos } =
    useContext(DataContext);

  const livro = {
    codigoLivro: dadosLivro.codigoLivro,
    title: dadosLivro.title,
    quantidade: 1,
  };
  const handleOnPress = async () => {
    await addItem("carrinho", livro);
    setQtdCarrinho(qtdCarrinho + 1);
  };
  const handleFavoritosOnPress = async () => {
    const existente = await addItem("favoritos", livro);
    if (existente === false) {
      setQtdFavoritos(qtdFavoritos + 1);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: `data:image/png;base64,${dadosLivro.img}`,
            //uri: `https://apilivraria-production.up.railway.app/api/livros/img/${dadosLivro.codigoLivro}`,
          }}
          style={styles.imageCardLivro}
        ></Image>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{dadosLivro.title}</Text>
          <Text style={styles.cardDescription}>{dadosLivro.descricao}</Text>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.cartButton} onPress={handleOnPress}>
              <Text style={styles.btnComprar}>
                COMPRAR
                <FontAwesome name="shopping-cart" size={16} color="white" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heart}
              onPress={handleFavoritosOnPress}
            >
              <FontAwesome name="heart" size={25} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#696462",
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
  btnComprar: {
    backgroundColor: "#F95C47",
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  icons: {
    marginTop: 20,
    justifyContent: "center",
    gap: 18,
  },
  heart: {
    alignSelf: "center",
  },
});
