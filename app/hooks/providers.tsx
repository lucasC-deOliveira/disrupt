"use client";
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "./useTheme";
import { ApolloWrapper } from "./apolloWrapper";
import { MyHeaderProvider } from "./navigation";
import Snowfall from "react-snowfall";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MyHeaderProvider>
      <ThemeProvider>
      <Snowfall snowflakeCount={200} />
        <ApolloWrapper>{children}</ApolloWrapper>
      </ThemeProvider>
    </MyHeaderProvider>
  );
}
