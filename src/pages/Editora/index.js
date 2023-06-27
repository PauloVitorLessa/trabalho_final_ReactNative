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
import { EditoraContext } from "../../context/EditoraContext";
import { LivroContext } from "../../context/LivroContext";
import CardLivro from "../../components/CardLivro/CardLivro";
import CardLivroHorizontal from "../../components/CardLivro/CardLivroHorizontal";
import CardLivroGrande from "../../components/CardLivro/CardLivroGrande";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RenderHomeEditora = ({ item, navigation }) => {
  const { armazenarDadosLivro } = useContext(LivroContext);
  const onPressHandler = (livro) => {
    console.log("dados livro armazenado");
    console.log(livro);
    armazenarDadosLivro(livro);
    navigation.navigate("Livro");
  };
  return (
    <View style={styles.cardContainer}>
      {item[0].img ? (
        <TouchableOpacity
          onPress={() => {
            onPressHandler(item[0]);
          }}
        >
          <CardLivroHorizontal
            img={item[0].img}
            title={item[0].title}
            //description={props.item[0].description}
          />
        </TouchableOpacity>
      ) : null}

      <View style={styles.flexDirectionRow}>
        {item[1].img ? (
          <TouchableOpacity
            onPress={() => {
              onPressHandler(item[1]);
            }}
          >
            <CardLivro
              img={item[1].img}
              title={item[1].title}
              //description={props.item[1].description}
            ></CardLivro>
          </TouchableOpacity>
        ) : null}
        {item[2].img ? (
          <TouchableOpacity
            onPress={() => {
              onPressHandler(item[2]);
            }}
          >
            <CardLivro
              img={item[2].img}
              title={item[2].title}
              //description={props.item[2].description}
            ></CardLivro>
          </TouchableOpacity>
        ) : null}
      </View>
      {item[3].img ? (
        <TouchableOpacity
          onPress={() => {
            onPressHandler(item[3]);
          }}
        >
          <CardLivroHorizontal
            img={item[3].img}
            title={item[3].title}
            //description={props.item[3].description}
          ></CardLivroHorizontal>
        </TouchableOpacity>
      ) : null}
      {item[4].img ? (
        <TouchableOpacity
          onPress={() => {
            onPressHandler(item[4]);
          }}
        >
          <CardLivroGrande
            img={item[4].img}
            title={item[4].title}
            //description={props.item[4].description}
          ></CardLivroGrande>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const generateData = () => {
  const { dadosEditora } = useContext(EditoraContext);
  const dataList = [];
  const listaLivros = dadosEditora.listaLivrosDTO;
  console.log("lista editoras");
  console.log(listaLivros);

  let size = listaLivros.length / 5;

  let count = 0;

  for (let i = 0; i <= size; i++) {
    let data = [];
    for (let j = 0; j < 5; j++) {
      data.push({
        img: listaLivros[j + count]?.imagem,
        title: listaLivros[j + count]?.nomeLivro,
        codigoLivro: listaLivros[j + count]?.codigoLivro,
        //description: listaLivros[j + count]?.description,
      });
    }
    dataList.push(data);
    count = count + 5;
  }
  console.log("datalist");
  console.log(dataList);
  return dataList;
};

export default function Editora({ navigation }) {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState();

  const dataList = generateData();

  return (
    <View style={styles.container}>
      <FlatList
        data={dataList}
        renderItem={({ item }) => (
          <RenderHomeEditora item={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => "key" + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    //padding: 10, // Aumentei a margem para 10
    flex: 1,
  },

  flexDirectionRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
  },
});
