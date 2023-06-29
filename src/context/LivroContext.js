import React, { createContext, useState } from "react";

export const LivroContext = createContext({});

export const LivroProvider = ({ children }) => {
  const [dadosLivro, setDadosLivro] = useState("");

  const armazenarDadosLivro = (livro) => {
    setDadosLivro(livro);
  };

  return (
    <LivroContext.Provider
      value={{
        dadosLivro,
        armazenarDadosLivro,
      }}
    >
      {children}
    </LivroContext.Provider>
  );
};
