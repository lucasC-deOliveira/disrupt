import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./componens/Sidebar";
import { Header } from "./componens/Header";
import { ConfigButton } from "./componens/ConfigButton";
import Providers from "./hooks/providers";
import colorful from "../public/images/natalNeon.jpg";

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
        className={`${roboto.className} hiddenscrollbar grid grid-cols-12 px-8 py-4  `}
        style={{
          background: `url(${colorful.src})`,
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          // backgroundSize: 'cover',
          // backgroundAttachment: 'fixed',
        }}
      >
        <Providers>
          <Header />
          <Sidebar />
          <main className="col-span-12 md:col-span-8 lg:col-span-10 ">
            {children}
          </main>
          <div className="absolute top-44 right-12">
            <ConfigButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
