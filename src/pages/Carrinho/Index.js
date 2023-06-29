import React from "react";
import { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { DataContext } from "../../context/DataContext";
import { FontAwesome } from "@expo/vector-icons";
import { save, getValueFor, deleteValue } from "../../services/DataService";
import CardCarrinho from "../../components/CardLivro/CardCarrinho";

const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

export default function Carrinho({ navigation }) {
  const [livrosCarrinhoDB, setLivrosCarrinhoDB] = useState([]);
  const [checked, setChecked] = React.useState("first");
  const [selectedBook, setSelectedBook] = React.useState("");
  const { setQtdCarrinho, qtdCarrinho } = useContext(DataContext);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const livrosCarrinho = await getValueFor("carrinho");
        setLivrosCarrinhoDB(livrosCarrinho);
      })();
    }, [])
  );
  const handleButton = async () => {
    if (livrosCarrinhoDB && livrosCarrinhoDB.length !== 0) {
      await deleteValue("carrinho");
      setQtdCarrinho(0);
      navigation.navigate("PedidoFinalizado");
    }
  };

  const handleOnPress = (item) => {
    setSelectedBook(item);
  };
  const handleTrash = async () => {
    if (selectedBook) {
      console.log("selected book :" + JSON.stringify(selectedBook));
      try {
        let resultArray = [];
        let result = await getValueFor("carrinho");
        console.log("result :" + JSON.stringify(result));
        if (result) {
          resultArray = result;
          console.log("arrey from db :" + JSON.stringify(resultArray));
          livro = resultArray.filter(
            (element) => element.codigoLivro === selectedBook.codigoLivro
          );
          resultArray = resultArray.filter(
            (element) => element.codigoLivro !== selectedBook.codigoLivro
          );

          console.log("arrey to db :" + JSON.stringify(resultArray));

          await save("carrinho", resultArray);
          setQtdCarrinho(qtdCarrinho - livro[0].quantidade);
          setLivrosCarrinhoDB(resultArray);
        }
      } catch (error) {
        console.log("erro ao persistir dados no addCarrinho:" + error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.cardTitle}>Carrinho</Text>
          <Text style={styles.text}>Produtos</Text>
        </View>
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => handleTrash()}
        >
          <FontAwesome name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={livrosCarrinhoDB}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleOnPress(item)}
              style={
                selectedBook.codigoLivro === item.codigoLivro
                  ? styles.btnActive
                  : styles.btn
              }
            >
              <CardCarrinho
                codigoLivro={item.codigoLivro}
                title={item.title}
                quantidade={item.quantidade}
              ></CardCarrinho>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.codigoLivro}
        />
      </View>
      <View style={styles.total}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{qtdCarrinho}</Text>
      </View>
      <Text style={styles.cardTitle}>Pagamento</Text>
      <View style={styles.pagamento}>
        <View>
          <View style={styles.pix}>
            <FontAwesome name="money" size={28} color="white" />
            <Text style={styles.text}>Pix</Text>
          </View>
          <View style={styles.cartao}>
            <FontAwesome name="credit-card-alt" size={24} color="white" />
            <Text style={styles.text}>Cartão de Credito</Text>
          </View>
        </View>
        <View>
          <RadioButton
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setChecked("first")}
            color="white"
          />
          <RadioButton
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
            color="white"
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleButton} style={styles.button}>
        <Text style={styles.buttonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#696462",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardInfo: {
    width: windowWidth / 2 - 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 25,
    color: "white",
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: "white",
    marginBottom: 10,
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
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
  trashButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  flatlist: {
    height: 290,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    borderTopColor: "white",
    borderTopWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
  },
  total: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pagamento: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pix: {
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
  },
  cartao: {
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#f95c47",
    marginTop: 10,
    width: 270,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  btnActive: {
    backgroundColor: "#2D2033",
  },
  buttonText: {
    fontWeight: "bold",
    color: "black",
  },
});
