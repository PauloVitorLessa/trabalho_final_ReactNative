import React from "react";
import { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { getValueFor, addCarrinho } from "../../services/DataService";
import { LivroContext } from "../../context/LivroContext";
import { DataContext } from "../../context/DataContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Livro() {
  const { dadosLivro } = useContext(LivroContext);
  const { setQtdCarrinho, qtdCarrinho } = useContext(DataContext);

  const livro = {
    codigoLivro: dadosLivro.codigoLivro,
    title: dadosLivro.title,
    quantidade: 1,
  };
  const handleOnPress = async () => {
    await addCarrinho("carrinho", livro);
    setQtdCarrinho(qtdCarrinho + 1);
    console.log("apos add carrinho");
    console.log(await getValueFor("carrinho"));
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: `data:image/png;base64,${dadosLivro.img}`,
            //uri: `https://apilivraria-production.up.railway.app/api/livros/img/${dadosLivro.codigoLivro}`,
          }}
          style={styles.imageCardLivro}
        ></Image>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{dadosLivro.title}</Text>
          <Text style={styles.cardDescription}>{dadosLivro.descricao}</Text>
          <TouchableOpacity style={styles.botao} onPress={handleOnPress}>
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
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  cardDescription: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
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
    backgroundColor: "#F95C47",
    borderRadius: 5,
  },
});
