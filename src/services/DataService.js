import * as SecureStore from "expo-secure-store";

export async function save(key, value) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.log("erro ao persistir dados:" + error);
  }
}

export async function getValueFor(key) {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return JSON.parse(result);
    } else {
      alert("No values stored under that key.");
    }
  } catch (error) {
    console.log("erro ao recuperar dados:" + error);
  }
}

export async function deleteValue(key) {
  await SecureStore.deleteItemAsync(key);
}

export async function addCarrinho(key, value) {
  try {
    let resultArray = [];
    let result = await SecureStore.getItemAsync(key);

    if (result) {
      resultArray = JSON.parse(result);
      let existente = false;
      console.log("valor:" + JSON.stringify(resultArray));
      resultArray.forEach((element) => {
        console.log("elemente: " + JSON.stringify(element));
        if (element.codigoLivro === value.codigoLivro) {
          element.quantidade = element.quantidade + value.quantidade;
          existente = true;
        }
      });
      if (existente) {
        await SecureStore.setItemAsync(key, JSON.stringify(resultArray));
      } else {
        resultArray.push(value);
        await SecureStore.setItemAsync(key, JSON.stringify(resultArray));
      }
    } else {
      resultArray.push(value);
      await SecureStore.setItemAsync(key, JSON.stringify(resultArray));
    }
  } catch (error) {
    console.log("erro ao persistir dados no addCarrinho:" + error);
  }
}
