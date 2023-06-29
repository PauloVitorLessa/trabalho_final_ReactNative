import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { LivroContext } from "../../context/LivroContext";
import { EditoraContext } from "../../context/EditoraContext";
import LivrosRecentes from "../../components/LivrosRecentes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Editora = ({ item, navigation }) => {
  const { armazenarDadosEditora } = useContext(EditoraContext);
  const onPressHandler = () => {
    armazenarDadosEditora(item);
    navigation.navigate("EditoraStack");
  };
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onPressHandler}>
        <Image
          source={{
            uri: `data:image/png;base64,${item.img}`,
          }}
          style={styles.imageEditora}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

const CardDestaque = ({ urlImage, title, description, rating }) => (
  <View style={styles.CardDestaque}>
    <Image
      source={{
        uri: urlImage,
      }}
      style={styles.imageCardDestaque}
    ></Image>
    <View style={styles.destaqueBodyContainer}>
      <View style={styles.divDestaque}>
        <Text style={styles.cardTitle}>{title}</Text>

        <View style={styles.rating}>
          <MaterialIcons name="star" color="white" size={30} />
          <MaterialIcons name="star" color="white" size={30} />
          <MaterialIcons name="star" color="white" size={30} />
          <MaterialIcons name="star-half" color="white" size={30} />
        </View>
      </View>
    </View>
  </View>
);

export default function Home({ navigation }) {
  const { dadosUsuario } = useContext(DataContext);
  const { armazenarListaEditora } = useContext(DataContext);
  const { armazenarDadosLivro } = useContext(LivroContext);
  const [dadosEditora, setDadosEditora] = useState();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingDestaque, setLoadingDestaque] = useState(false);
  const [livro, setLivro] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setLoadingDestaque(true);
      getLivro();
    }, [])
  );

  useEffect(() => {
    setLoadingLogin(true);
    getTodasEditoras();
  }, []);

  const getTodasEditoras = async () => {
    await AxiosInstance.get("/editoras", {
      headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
    })
      .then((resultado) => {
        setDadosEditora(resultado.data);
        armazenarListaEditora(resultado.data);
        setLoadingLogin(false);
      })
      .catch((error) => {
        console.log(
          "Ocorreu um erro ao recuperar os dados das Editoras: " + error
        );
      });
  };

  const getLivro = async () => {
    const randomNumber = Math.floor(Math.random() * (22 - 17)) + 17;
    await AxiosInstance.get(`/livros/${randomNumber}`, {
      headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
    })
      .then((resultado) => {
        setLivro(resultado.data);
        setLoadingDestaque(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro ao recuperar os dados: " + error);
      });
  };

  const handleCardDestaqueOnPress = () => {
    armazenarDadosLivro(livro);
    navigation.navigate("Livro");
  };

  return (
    <View style={styles.container}>
      <View style={styles.editorasContainer}>
        <Text style={styles.title}>EDITORAS</Text>
        {loadingLogin ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <FlatList
            horizontal={true}
            data={dadosEditora}
            renderItem={({ item }) => (
              <Editora item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.codigoEditora}
          />
        )}
      </View>
      {/* Chama do card de Livros Recentes */}
      <LivrosRecentes navigation={navigation} />
      <View style={styles.destaqueContainer}>
        <Text style={styles.titleDestaque}>DESTAQUES</Text>
        {loadingDestaque ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <TouchableOpacity onPress={handleCardDestaqueOnPress}>
            <CardDestaque
              urlImage={`data:image/png;base64,${livro.img}`}
              title={livro.nomeLivro}
              description={livro.descricao}
              rating={MaterialIcons}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "#696462",
    flex: 1,
  },
  editorasContainer: {
    margin: 10,
  },
  recentesContainer: {
    backgroundColor: "black",
    text: {
      color: "white",
      fontSize: 20,
    },
  },
  destaqueContainer: {
    backgroundColor: "#696462",
    borderRadius: 100,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    alignSelf: "center",
    borderRadius: 10,
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    borderRadius: 10,
    paddingLeft: 3,
  },
  cardDescription: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
    borderRadius: 10,
    paddingLeft: 3,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 5,
    padding: 4,
    width: 200,
  },
  button: {
    backgroundColor: "white",
    marginTop: 10,
    width: 200,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F95C47",
  },
  buttonText: {
    color: "white",
  },
  item: {
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 10,
    marginTop: 10,
  },
  titleDestaque: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  imageEditora: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    marginRight: 20,
    justifyContent: "center",
    borderRadius: 100,
  },
  imageCardLivro: {
    width: 110,
    height: 120,
    resizeMode: "cover",
  },
  imageCardDestaque: {
    width: windowWidth - 20,
    height: windowHeight / 5.5,
    resizeMode: "cover",
  },
  CardLivro: {
    backgroundColor: "white",
    borderColor: "black",
    alignSelf: "center",
    borderRadius: 5,
    paddingBottom: 3,
    marginRight: 20,
  },
  CardDestaque: {
    borderColor: "black",
    paddingBottom: 3,
    marginTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  destaqueBodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2D2033",
    paddingBottom: 20,
  },
  rating: {
    alignItems: "center",
    flexDirection: "row",
  },
  tinyLogo: {
    borderRadius: 100,
    margin: 10,
    width: 70,
    height: 70,
  },
  divDestaque: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
