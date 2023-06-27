import React from "react";
import { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { DataContext } from "../../context/DataContext";
import { LivroContext } from "../../context/LivroContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Livro() {
  const { dadosUsuario } = useContext(DataContext);
  const { dadosLivro } = useContext(LivroContext);
  console.log(dadosLivro);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            //uri: `data:image/png;base64,${dadosLivro.img}`,
            uri: `https://apilivraria-production.up.railway.app/api/livros/img/${dadosLivro.codigoLivro}`,
          }}
          style={styles.imageCardLivro}
        ></Image>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{dadosLivro.title}</Text>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.cardTitle}>COMPRAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  cardInfo: {
    width: windowWidth / 2 - 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: "white",
    textAlign: "center",
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
  botao: {
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
});
