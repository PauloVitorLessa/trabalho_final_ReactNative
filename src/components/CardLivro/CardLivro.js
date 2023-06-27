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

export default function CardLivro(props) {
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
});
