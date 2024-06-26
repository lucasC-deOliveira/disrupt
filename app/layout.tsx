import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./componens/Sidebar";
import { Header } from "./componens/Header";
import { AiFillSetting } from "react-icons/ai";
import { ConfigButton } from "./componens/ConfigButton";
import Providers from "./hooks/providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Disrupt",
  description: "Created by Lucas Carvalho de Oliveira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} hiddenscrollbar grid grid-cols-12 px-8 py-4 `}
      >
        <Providers>
          <Header />
          <Sidebar />
          <main className="col-span-10">{children}</main>
          <div className="absolute top-32 right-8">
            <ConfigButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
