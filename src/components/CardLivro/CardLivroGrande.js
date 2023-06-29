import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useContext } from "react";
import { addCarrinho, getValueFor } from "../../services/DataService";
import { FontAwesome } from "@expo/vector-icons";
import { DataContext } from "../../context/DataContext";

const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

export default function CardLivroGrande(props) {
  const { setQtdCarrinho, qtdCarrinho } = useContext(DataContext);
  const livro = {
    codigoLivro: props.idLivro,
    title: props.title,
    quantidade: 1,
  };
  const handleOnPress = async () => {
    await addCarrinho("carrinho", livro);
    setQtdCarrinho(qtdCarrinho + 1);
    console.log("apos add carrinho");
    console.log(await getValueFor("carrinho"));
  };

  return (
    <View style={styles.CardLivroGrande}>
      <Image
        source={{
          uri: `data:image/png;base64,${props.img}`,
        }}
        style={styles.imageCardLivro}
      ></Image>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{props.title}</Text>
        <TouchableOpacity style={styles.cartButton} onPress={handleOnPress}>
          <Text style={styles.btnComprar}>
            COMPRAR
            <FontAwesome name="shopping-cart" size={16} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    color: "white",
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
  },
  imageCardLivro: {
    width: windowWidth - 10,
    height: 170,
    resizeMode: "cover",
  },
  CardLivroGrande: {
    backgroundColor: "#2D2033",
    borderColor: "black",
    alignSelf: "center",
    borderRadius: 5,
    paddingBottom: 3,
    marginTop: 5,
    marginBottom: 5,
    width: windowWidth - 10,
  },
  cardInfo: {
    justifyContent: "center",
    flex: 1,
  },
  cartButton: {
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
});
