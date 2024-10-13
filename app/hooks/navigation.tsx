import React, { createContext, useContext, useState, ReactNode } from "react";
import { IconType } from 'react-icons';
// Define a interface para o tipo do contexto

interface path {
  Icon: IconType;
  name: string;
}

interface HeaderContextType {
  paths: path[];
  title: string;
  changeTitle: (newTitle: string) => void;
  changePaths: (newPaths: path[]) => void;
}

// Cria o contexto, inicializando como undefined para forçar a verificação de uso do contexto apenas dentro do provedor
const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

// Cria um componente provedor para envolver os componentes que usarão o contexto
export function MyHeaderProvider({ children }: { children: ReactNode }) {
  const [paths, setPaths] = useState<HeaderContextType["paths"]>([]);

  const [title, setTitle] = useState<string>("");

  const changePaths = (newPaths: HeaderContextType["paths"]) => {
    setPaths(newPaths);
  };

  const changeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <HeaderContext.Provider value={{ title, paths, changePaths, changeTitle }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useMyHeader(): HeaderContextType {
    const context = useContext(HeaderContext);
    if (!context) {
      throw new Error('useMyHeader deve ser usado dentro de um MyProvider');
    }
    return context;
  }
