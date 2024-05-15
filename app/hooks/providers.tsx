'use client'
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "./useTheme";

export default function Providers({ children }:{children:ReactNode}) {

    return (
      <ThemeProvider>{children}</ThemeProvider>
    )
  }