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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//const { rating } = this.props;

//const CardLivro = ({ urlImage, title, description })

export default function CardLivroHorizontal(props) {
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
});
