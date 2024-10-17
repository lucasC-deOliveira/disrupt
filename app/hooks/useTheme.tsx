"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Theme {
  color: string;
  background: string;
  cardFrame:string
}

interface ThemeProviderContext {
  children: ReactNode;
}

interface ThemeContextData {
  theme: Theme;
  handleSetTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderContext) {
  const [theme, setTheme] = useState<Theme>({} as Theme);

  const handleSetTheme = (theme: Theme) => {
    const newTheme = {
      color: theme.color.trim(),
      background: theme.background.trim(),
      cardFrame:theme.cardFrame,
    };

    localStorage.setItem("theme", JSON.stringify(newTheme));

    setTheme(newTheme);
  };

  useEffect(() => {
    const colorTheme = localStorage.getItem("theme");
    if (colorTheme) {
      try {
        setTheme(JSON.parse(colorTheme));
      } catch (e) {
        localStorage.setItem(
          "theme",
          JSON.stringify({ color: "red-500", background: "black", cardFrame:"" })
        );
        setTheme({
          color: "red-500",
          background: "black",
          cardFrame:""
        });
      }
    } else {
      setTheme({
        color: "red-500",
        background: "black",
        cardFrame:""
      });
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleSetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
