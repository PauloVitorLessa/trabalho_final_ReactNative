import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useContext, useEffect } from "react";
import { save, getValueFor, deleteValue } from "../../services/DataService";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CardCarrinho(props) {
  const [quantity, setQuantity] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getLivroCarrinho();
    }, [])
  );

  const getLivroCarrinho = async () => {
    try {
      let result = await getValueFor("carrinho");
      if (result) {
        let livro = result.filter(
          (livro) => livro.codigoLivro === props.codigoLivro
        );
        setQuantity(livro[0].quantidade);
      }
    } catch (error) {
      console.log("erro ao persistir dados no addCarrinho:" + error);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.CardLivroHorizontal}>
      <Image
        source={{
          uri: `https://apilivraria-production.up.railway.app/api/livros/img/${props.codigoLivro}`,
        }}
        style={styles.imageCardLivro}
      ></Image>
      <View style={styles.CardBody}>
        <Text style={styles.cardTitle}>{props.title}</Text>
      </View>
      <View style={styles.quantityButtons}>
        <TouchableOpacity onPress={incrementQuantity}>
          <FontAwesome name="plus" size={16} color="white" />
        </TouchableOpacity>
        <Text style={styles.cardTitle}>{quantity}</Text>
        <TouchableOpacity onPress={decrementQuantity}>
          <FontAwesome name="minus" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageCardLivro: {
    width: windowWidth / 4.6,
    height: 100,
    resizeMode: "contain",
  },

  CardLivroHorizontal: {
    //backgroundColor: "#2D2033",

    paddingBottom: 0,
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
    width: windowWidth - 10,
    justifyContent: "space-evenly",
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 1.5,
    paddingBottom: 13,
    paddingTop: 15,
  },
  CardBody: {
    justifyContent: "center",
    padding: 3,
    width: windowWidth / 4,
    alignItems: "center",
  },
  quantityButtons: {
    width: windowWidth / 6,
    justifyContent: "center",
  },
});

//"#2D2033",
