import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { DataContext } from "../../context/DataContext";
import { addItem, getValueFor } from "../../services/DataService";

const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

export default function CardLivro(props) {
  const { setQtdCarrinho, qtdCarrinho, setQtdFavoritos, qtdFavoritos } =
    useContext(DataContext);

  const livro = {
    codigoLivro: props.idLivro,
    title: props.title,
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
    <View style={styles.CardLivro}>
      <Image
        source={{
          uri: `data:image/png;base64,${props.img}`,
        }}
        style={styles.imageCardLivro}
      ></Image>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{props.title}</Text>
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
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    borderRadius: 10,
    padding: 3,
  },
  imageCardLivro: {
    width: 165,
    height: 120,
    resizeMode: "cover",
    width: windowWidth / 2 - 10,
    alignSelf: "center",
  },
  CardLivro: {
    backgroundColor: "#2D2033",
    borderRadius: 5,
    paddingBottom: 3,
    marginBottom: 5,
    marginTop: 5,
    width: windowWidth / 2 - 10,
    flex: 1,
  },
  cardInfo: {
    justifyContent: "center",
    flex: 1,
  },
  cartButton: {
    backgroundColor: "transparent",
    margin: 10,
  },
  btnComprar: {
    backgroundColor: "#F95C47",
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  heart: {
    alignSelf: "center",
  },
});
