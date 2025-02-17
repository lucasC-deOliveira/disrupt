import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./componens/Sidebar";
import { Header } from "./componens/Header";
import { ConfigButton } from "./componens/ConfigButton";
import Providers from "./hooks/providers";
import colorful from "../public/images/wall.jpg";
import TitleBar from "./componens/window";

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
        className={`${roboto.className}  w-full `}
        style={{
          background: `url(${colorful.src})`,
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          // backgroundSize: 'cover',
          // backgroundAttachment: 'fixed',
        }}
      >
        <Providers>
          {process.env.ELECTRON === 'true' && (
            <TitleBar />
          )}
          <div className={`col-span-12 grid grid-cols-12 px-4 py-4 ${process.env.ELECTRON === 'true' && "pt-16 "}  overflow-auto hover:scrollbar-visible scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 rounded-t-2xl`}>
            <Header />
            <Sidebar />
            <main className="col-span-12 md:col-span-8 lg:col-span-10 ">
              {children}
            </main>
            <div className={`absolute ${process.env.ELECTRON === 'true' ? "top-56" :  "top-48" } right-12`}>
              <ConfigButton />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}