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
import {
  addCarrinho,
  getValueFor,
  deleteValue,
} from "../../services/DataService";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CardLivroGrande(props) {
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
          <FontAwesome name="shopping-cart" size={24} color="white" />
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
    //height: 210,
  },
  cardInfo: {
    justifyContent: "center",
    flex: 1,
  },
  cartButton: {
    alignSelf: "center",
  },
});
