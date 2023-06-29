import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { addCarrinho, getValueFor } from "../../services/DataService";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

export default function CardLivroHorizontal(props) {
  const livro = {
    codigoLivro: props.idLivro,
    title: props.title,
    quantidade: 1,
  };

  const handleOnPress = async () => {
    await addCarrinho("carrinho", livro);
    console.log("apos add carrinho");
    console.log(await getValueFor("carrinho"));
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
  },
  CardBody: {
    justifyContent: "center",
    padding: 3,
    width: windowWidth / 2 - 5,
    alignItems: "center",
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
