import { useContext } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { LivroContext } from "../../context/LivroContext";
import { EditoraContext } from "../../context/EditoraContext";

export default function Destaques() {
  const { dadosLivro } = useContext(LivroContext);
  const { dadosEditora } = useContext(EditoraContext);
  console.log(dadosLivro);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>TEXTO DE DESTAQUE</Text>
      <Text style={styles.cardTitle}>{dadosLivro.title}</Text>
      <Image
        source={{
          uri: `data:image/png;base64,${dadosEditora.img}`,
        }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  title: {
    color: "white",
  },
});
