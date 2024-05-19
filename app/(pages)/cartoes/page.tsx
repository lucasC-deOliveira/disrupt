"use client";

import { useTheme } from "@/app/hooks/useTheme";
import girl from "@/public/images/girl.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
export default function Cartoes() {
  const { theme } = useTheme();
  return (
    <section className="w-full pl-16 pr-16  ">
     <div className="flex items-center justify-center mb-4 relative">
       <h4 className="text-2xl my-4 text-center" style={{color:theme.color}}>Baralhos</h4>
      <Link
        className=" w-44 p-2 border-2 rounded-md flex gap-4 absolute right-0 items-center justify-center self-end"
        style={{ borderColor: theme.color, color: theme.color }}
        href="/provas/baralho/1"
      >
        <AiOutlinePlus/>
        Novo Baralho
      </Link>
     </div>
      <div className="w-full  rounded-md grid grid-cols-4 gap-4 ">
        <Link
          href={"cartoes/baralho/1"}
          className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}
        >
          <div   className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}>
          <div
            className=" border-2 rounded-md   p-8"
            style={{ borderColor: theme.color }}
          >
            {" "}
            <div className="flex w-full justify-end mb-4">
              <h6 className="text-m" style={{ color: theme.color }}>
                CARTÕES 1000
              </h6>
            </div>
            <div
              className="flex items-center justify-center  rounded-md border-2  mb-8"
              style={{ borderColor: theme.color }}
            >
              <Image
                src={girl.src}
                alt="girl"
                width={44}
                height={90}
                className="w-full h-66 rounded-md"
              />
            </div>
            <h2
              className="text-center text-4xl font-bold my-4"
              style={{ color: theme.color }}
            >
              Fisica
            </h2>
            <div className="flex w-full justify-between">
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Novos
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Aprender
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  6
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Revisar
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
            </div>
          </div>
          </div>
        </Link>
        <Link
          href={"/cartoes/1"}
          className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}
        >
          <div   className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}>
          <div
            className=" border-2 rounded-md   p-8"
            style={{ borderColor: theme.color }}
          >
            {" "}
            <div className="flex w-full justify-end mb-4">
              <h6 className="text-m" style={{ color: theme.color }}>
                CARTÕES 1000
              </h6>
            </div>
            <div
              className="flex items-center justify-center  rounded-md border-2  mb-8"
              style={{ borderColor: theme.color }}
            >
              <Image
                src={girl.src}
                alt="girl"
                width={44}
                height={90}
                className="w-full h-66 rounded-md"
              />
            </div>
            <h2
              className="text-center text-4xl font-bold my-4"
              style={{ color: theme.color }}
            >
              Fisica
            </h2>
            <div className="flex w-full justify-between">
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Novos
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Aprender
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  6
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Revisar
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
            </div>
          </div>
          </div>
        </Link>
        <Link
          href={"/cartoes/1"}
          className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}
        >
          <div   className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}>
          <div
            className=" border-2 rounded-md   p-8"
            style={{ borderColor: theme.color }}
          >
            {" "}
            <div className="flex w-full justify-end mb-4">
              <h6 className="text-m" style={{ color: theme.color }}>
                CARTÕES 1000
              </h6>
            </div>
            <div
              className="flex items-center justify-center  rounded-md border-2  mb-8"
              style={{ borderColor: theme.color }}
            >
              <Image
                src={girl.src}
                alt="girl"
                width={44}
                height={90}
                className="w-full h-66 rounded-md"
              />
            </div>
            <h2
              className="text-center text-4xl font-bold my-4"
              style={{ color: theme.color }}
            >
              Fisica
            </h2>
            <div className="flex w-full justify-between">
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Novos
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Aprender
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  6
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Revisar
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
            </div>
          </div>
          </div>
        </Link>
        <Link
          href={"/cartoes/1"}
          className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}
        >
          <div   className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}>
          <div
            className=" border-2 rounded-md   p-8"
            style={{ borderColor: theme.color }}
          >
            {" "}
            <div className="flex w-full justify-end mb-4">
              <h6 className="text-m" style={{ color: theme.color }}>
                CARTÕES 1000
              </h6>
            </div>
            <div
              className="flex items-center justify-center  rounded-md border-2  mb-8"
              style={{ borderColor: theme.color }}
            >
              <Image
                src={girl.src}
                alt="girl"
                width={44}
                height={90}
                className="w-full h-66 rounded-md"
              />
            </div>
            <h2
              className="text-center text-4xl font-bold my-4"
              style={{ color: theme.color }}
            >
              Fisica
            </h2>
            <div className="flex w-full justify-between">
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Novos
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Aprender
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  6
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Revisar
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
            </div>
          </div>
          </div>
        </Link>
        <Link
          href={"/cartoes/1"}
          className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}
        >
          <div   className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}>
          <div
            className=" border-2 rounded-md   p-8"
            style={{ borderColor: theme.color }}
          >
            {" "}
            <div className="flex w-full justify-end mb-4">
              <h6 className="text-m" style={{ color: theme.color }}>
                CARTÕES 1000
              </h6>
            </div>
            <div
              className="flex items-center justify-center  rounded-md border-2  mb-8"
              style={{ borderColor: theme.color }}
            >
              <Image
                src={girl.src}
                alt="girl"
                width={44}
                height={90}
                className="w-full h-66 rounded-md"
              />
            </div>
            <h2
              className="text-center text-4xl font-bold my-4"
              style={{ color: theme.color }}
            >
              Fisica
            </h2>
            <div className="flex w-full justify-between">
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Novos
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Aprender
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  6
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-md" style={{ color: theme.color }}>
                  Revisar
                </h6>
                <h6 className="text-md" style={{ color: theme.color }}>
                  5
                </h6>
              </div>
            </div>
          </div>
          </div>
        </Link>
        <Link
          href={"/baralho/1"}
          className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}
        >
          <div   className=" border-2 rounded-md   pr-1"
          style={{ borderColor: theme.color }}>
          <div
            className=" border-2 rounded-md   p-8 flex flex-col items-center gap-4"
            style={{ borderColor: theme.color }}
          >
            <AiOutlinePlus className="w-72 h-72" style={{fill:theme.color}}/>
            <h5 className="text-4xl font-bold mb-6" style={{color:theme.color}}>Novo Baralho</h5>
          </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
