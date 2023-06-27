import React, { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

//contexto
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [dadosUsuario, setDadosUsuario] = useState("");
  const [listaEditoras, setListaEditoras] = useState("");

  const armazenarDadosUsuario = (jwt) => {
    var jwtDecodificado = jwt_decode(jwt);

    //.user = chave do json retornado pelo backend que contem os dados do usuario logado
    var usuario = jwtDecodificado.user;
    usuario = JSON.parse(usuario);

    setDadosUsuario({
      id: usuario?.id,
      nome: usuario?.username,
      email: usuario?.email,
      token: jwt,
    });
  };

  const armazenarListaEditora = (lista) => {
    setListaEditoras(lista);
  };

  return (
    <DataContext.Provider
      value={{
        dadosUsuario,
        armazenarDadosUsuario,
        listaEditoras,
        armazenarListaEditora,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
