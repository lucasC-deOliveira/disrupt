"use client";
import { ThemeProvider, useTheme } from "@/app/hooks/useTheme";
import girl from "../../../public/images/girl.png";
import Image from "next/image";
import Link from "next/link";
export default function Provas() {
  const { theme } = useTheme();

  return (
    <section className="w-full pl-16 pr-16 ">
      <div className="flex w-full justify-end mb-4">
        <Link
          className="w-22 p-2 border-2 rounded-md"
          style={{ borderColor: theme.color, color: theme.color }}
          href="/provas/1"
        >
          Cadastrar
        </Link>
      </div>
      <div className="w-full  rounded-md grid grid-cols-3 gap-4 ">
        <Link
        href={'/provas/1'}
          className=" border-2 rounded-md   flex  p-4 gap-4"
          style={{ borderColor: theme.color }}
        >
          <div className="flex items-center justify-center  rounded-full border-2 border-red-500 ">
            <Image
              src={girl.src}
              alt="girl"
              width={44}
              height={44}
              className="w-20 h-20 rounded-full "
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div>
              <h2
                className="text-center text-2xl font-bold"
                style={{ color: theme.color }}
              >
                Titulo
              </h2>
              <hr style={{ borderColor: theme.color }} />
            </div>
            <h6 className="text-center text-md" style={{ color: theme.color }}>
              Esta e uma prova bla bla bla
            </h6>
          </div>
        </Link>
      </div>
    </section>
  );
}
