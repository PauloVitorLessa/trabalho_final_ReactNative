import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { deleteValue } from "../../services/DataService";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { armazenarDadosUsuario, limpaDadosUsuario, setLoading } =
    useContext(DataContext);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      limpaDadosUsuario();
    }, [])
  );

  const inicializaCarrinho = async (key, value) => {
    await deleteValue("carrinho");
  };

  const handleLogin = async () => {
    setLoading(true);
    setLoadingLogin(true);
    try {
      const resultado = await AxiosInstance.post("/auth/signin", {
        username: email,
        password: senha,
      });

      if (resultado.status === 200) {
        var jwtToken = resultado.data;
        armazenarDadosUsuario(jwtToken["accessToken"]);
        setLoadingLogin(false);
        const carrinho = [
          {
            codigoLivro: "",
            img: "",
            title: "",
            quantidade: 0,
          },
        ];
        inicializaCarrinho("carrinho", carrinho);
      } else {
        console.log("Erro ao realizar o login");
      }
    } catch (error) {
      console.log("erro durante o processo de login: " + error);
      setLoadingLogin(false);
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.text}>Bem-vindos</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="digite seu e-mail"
        style={styles.input}
      />
      <View style={styles.passwordInputContainer}>
        <View style={styles.passwordInputWrapper}>
          <TextInput
            onChangeText={setSenha}
            value={senha}
            placeholder="digite sua senha"
            secureTextEntry={!mostrarSenha}
            style={styles.passwordInput}
          />
          <TouchableOpacity
            onPress={toggleMostrarSenha}
            style={styles.showPasswordButton}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off" : "eye"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        {loadingLogin ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#696462",
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 20,
    margin: 30,
  },
  input: {
    backgroundColor: "#d3d3d3",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 5,
    padding: 9,
    width: 270,
    height: 40,
    borderColor: "#101b1b",
    fontSize: 16,
  },
  passwordInputContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: 20,
  },
  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 5,
    width: 270,
    height: 40,
    padding: 5,
    borderWidth: 2,
    borderColor: "#101b1b",
  },
  passwordInput: {
    flex: 1,
    padding: 4,
    fontSize: 16,
  },
  showPasswordButton: {
    padding: 2,
  },
  button: {
    backgroundColor: "#f95c47",
    marginTop: 10,
    width: 270,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
