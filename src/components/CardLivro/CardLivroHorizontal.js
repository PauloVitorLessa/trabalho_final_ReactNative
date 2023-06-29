import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useContext } from "react";
import { addItem, getValueFor } from "../../services/DataService";
import { FontAwesome } from "@expo/vector-icons";
import { DataContext } from "../../context/DataContext";

const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

export default function CardLivroHorizontal(props) {
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
    <View style={styles.CardLivroHorizontal}>
      <Image
        source={{
          uri: `data:image/png;base64,${props.img}`,
        }}
        style={styles.imageCardLivro}
      ></Image>
      <View style={styles.CardBody}>
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
  imageCardLivro: {
    width: windowWidth / 2 - 5,
    height: 120,
    resizeMode: "cover",
  },
  CardLivroHorizontal: {
    backgroundColor: "#2D2033",
    borderColor: "black",
    borderRadius: 5,
    paddingBottom: 0,
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
    width: windowWidth - 10,
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    borderRadius: 10,
    paddingLeft: 3,
    textAlign: "center",
  },
  CardBody: {
    justifyContent: "center",
    padding: 3,
    width: windowWidth / 2 - 5,
    gap: 10,
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
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },
  heart: {
    alignSelf: "center",
  },
});
