import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useState, useContext, useEffect } from "react";
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
            idLivro={item[0].codigoLivro}
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
              idLivro={item[1].codigoLivro}
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
              idLivro={item[2].codigoLivro}
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
            idLivro={item[3].codigoLivro}
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
            idLivro={item[4].codigoLivro}
          ></CardLivroGrande>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const generateData = (livrosEditora) => {
  const dataList = [];
  const listaLivros = livrosEditora;

  let size = listaLivros.length / 5;

  let count = 0;

  for (let i = 0; i <= size; i++) {
    let data = [];
    for (let j = 0; j < 5; j++) {
      data.push({
        img: listaLivros[j + count]?.imagem,
        title: listaLivros[j + count]?.nomeLivro,
        codigoLivro: listaLivros[j + count]?.codigoLivro,
        descricao: listaLivros[j + count]?.descricao,
      });
    }
    dataList.push(data);
    count = count + 5;
  }

  return dataList;
};

export default function Editora({ navigation }) {
  const { dadosUsuario } = useContext(DataContext);
  const { dadosEditora } = useContext(EditoraContext);
  const [livrosEditora, setLivrosEditora] = useState([]);

  useEffect(() => {
    const getLivrosEditora = async () => {
      await AxiosInstance.get(
        `/livros/por-editora/${dadosEditora.codigoEditora}`,
        {
          headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
        }
      )
        .then((resultado) => {
          setLivrosEditora(resultado.data);
        })
        .catch((error) => {
          console.log(
            "Ocorreu um erro ao recuperar os livros da Editora: " + error
          );
        });
    };
    getLivrosEditora();
  }, []);

  const dataList = generateData(livrosEditora);

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
    backgroundColor: "#696462",
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
