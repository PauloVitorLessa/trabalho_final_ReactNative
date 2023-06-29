import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { Rating } from "react-native-ratings";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { FontAwesome } from "@expo/vector-icons";
import {
  addCarrinho,
  getValueFor,
  deleteValue,
} from "../../services/DataService";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CardLivro(props) {
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
    <View style={styles.CardLivro}>
      <Image
        source={{
          uri: `data:image/png;base64,${props.img}`,
        }}
        style={styles.imageCardLivro}
      ></Image>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{props.title}</Text>
        <TouchableOpacity style={styles.cartButton} onPress={handleOnPress}>
          <Text style={styles.btnComprar}>COMPRAR
            <FontAwesome name="shopping-cart" size={20} color="white" />
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
    alignItems: "center",
  },
  cartButton: {
    backgroundColor: "transparent",
    margin: 10,
  },
  btnComprar: {
    backgroundColor: "green",
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
