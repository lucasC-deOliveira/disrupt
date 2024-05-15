"use client";

import { useTheme } from "@/app/hooks/useTheme";
import girl from "@/public/images/girl.png";
import Image from "next/image";
import Link from "next/link";

export default function Cartoes() {
  const { theme } = useTheme();
  return (
    <section className="w-full pl-16 pr-16 relative ">
      {/* <h1 className="text-center text-2xl" style={{ color: theme.color }}>
        Baralhos
      </h1> */}
      <Link
          className="w-22 p-2 border-2 rounded-md absolute top-2 right-12"
          style={{ borderColor: theme.color, color: theme.color }}
          href="/provas/1"
        >
          Cadastrar
        </Link>
      <div className="w-full  rounded-md grid grid-cols-6 gap-4 ">
        <Link
        href={'/cartoes/1'}
          className=" border-2 rounded-md   p-8"
          style={{ borderColor: theme.color }}
        >
          <div className="flex items-center justify-center  rounded-md border-2  " style={{borderColor:theme.color}}>
            <Image
              src={girl.src}
              alt="girl"
              width={44}
              height={44}
              className="w-full h-44 rounded-md "
            />
          </div>
              <h2
                className="text-center text-2xl font-bold mt-4"
                style={{ color: theme.color }}
              >
                Titulo
              </h2>
        </Link>
      </div>
    </section>
  );
}
