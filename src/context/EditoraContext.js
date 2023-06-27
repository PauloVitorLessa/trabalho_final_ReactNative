import React, { createContext, useState } from "react";

//contexto
export const EditoraContext = createContext({});

export const EditoraProvider = ({ children }) => {
  const [dadosEditora, setDadosEditora] = useState("");

  const armazenarDadosEditora = (editora) => {
    setDadosEditora(editora);
  };

  return (
    <EditoraContext.Provider
      value={{
        dadosEditora,
        armazenarDadosEditora,
      }}
    >
      {children}
    </EditoraContext.Provider>
  );
};
