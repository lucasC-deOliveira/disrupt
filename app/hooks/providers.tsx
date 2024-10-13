"use client";
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "./useTheme";
import { ApolloWrapper } from "./apolloWrapper";
import { MyHeaderProvider } from "./navigation";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MyHeaderProvider>
      <ThemeProvider>
        <ApolloWrapper>{children}</ApolloWrapper>
      </ThemeProvider>
    </MyHeaderProvider>
  );
}
