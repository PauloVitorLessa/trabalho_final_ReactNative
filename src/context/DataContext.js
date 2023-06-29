import React, { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [dadosUsuario, setDadosUsuario] = useState("");
  const [listaEditoras, setListaEditoras] = useState("");
  const [loading, setLoading] = useState(false);
  const [qtdCarrinho, setQtdCarrinho] = useState(0);

  const limpaDadosUsuario = () => {
    setDadosUsuario("");
  };

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
    setLoading(false);
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
        limpaDadosUsuario,
        loading,
        setLoading,
        qtdCarrinho,
        setQtdCarrinho,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
