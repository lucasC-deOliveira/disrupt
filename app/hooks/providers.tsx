"use client";
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "./useTheme";
import { ApolloWrapper } from "./apolloWrapper";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ApolloWrapper >{children}</ApolloWrapper>
    </ThemeProvider>
  );
}
