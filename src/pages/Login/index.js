import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { armazenarDadosUsuario } = useContext(DataContext);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async () => {
    console.log(`E-mail: ${email} - Senha: ${senha}`);
    try {
      const resultado = await AxiosInstance.post("/auth/signin", {
        username: email,
        password: senha,
      });

      if (resultado.status === 200) {
        var jwtToken = resultado.data;
        armazenarDadosUsuario(jwtToken["accessToken"]);

        navigation.navigate("DrawerRoutes");
      } else {
        console.log("Erro ao realizar o login");
      }
    } catch (error) {
      console.log("erro durante o processo de login: " + error);
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
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
              size={20} // Alterei o tamanho do ícone para 20
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 50,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 5,
    padding: 9,
    width: 270,
    height: 40,
    borderColor: "green",
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
    backgroundColor: "white",
    borderRadius: 5,
    width: 270,
    height: 40,
    padding: 5,
    borderWidth: 2,
    borderColor: "green",
  },
  passwordInput: {
    flex: 1,
    padding: 4,
    fontSize: 16,
  },
  showPasswordButton: {
    padding: 2, // Reduzi o tamanho do padding
  },
  button: {
    backgroundColor: "green",
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
});
