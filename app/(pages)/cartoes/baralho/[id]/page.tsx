"use client";
import { useTheme } from "@/app/hooks/useTheme";
import Link from "next/link";
import girl from "@/public/images/girl.png";
import Image from "next/image";
import { PiStudentFill } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Deck {
  id: string;
  photo: string;
  title: string;
  cards:[]
}

export default function Baralho({ params }: { params: { id: string } }) {
  const { theme } = useTheme();

  const [deck,setDeck] = useState<Deck>({} as Deck)

  const {replace} = useRouter()

  useEffect(()=>{
    const decksData = JSON.parse(localStorage.getItem("@Disrupt/Baralhos") || "[]") || []

    const deckData = decksData.find((x:Deck) => x.id === params.id)

    if(deckData){
      setDeck(deckData)
    }

  },[])

  const handleDelete = () => {
    const decksData = JSON.parse(localStorage.getItem("@Disrupt/Baralhos") || "[]") || []

    const newDecksData = decksData.filter((x:Deck) => x.id !== params.id)

    localStorage.setItem("@Disrupt/Baralhos",JSON.parse(newDecksData))
    
    replace("/cartoes")
  }

  return (
    <section className="w-full pl-16 pr-16 ">
      <div className="w-full  rounded-md flex flex-col items-center justify-center  px-96 gap-8 ">
      <div className="w-full flex justify-end "> 
          <Link
            className="  p-2 border-2 rounded-md text-2xl flex items-center gap-2 justify-center"
            style={{ borderColor: theme.color, color: theme.color }}
            href="/provas/baralho/1"
          >
            <AiOutlinePlus className="w-8 h-8" style={{fill:theme.color}} />
            Adicionar Cartões
          </Link>
        </div>
        <div
          className=" border-2 rounded-md  pr-1  w-full"
          style={{ borderColor: theme.color }}
        >
          <div
            className=" border-2 rounded-md   pr-1"
            style={{ borderColor: theme.color }}
          >
            <div
              className=" border-2 rounded-md   p-8"
              style={{ borderColor: theme.color }}
            >
              {" "}
              <div className="flex w-full justify-end mb-4">
                <h6 className="text-lg font-bold" style={{ color: theme.color }}>
                  CARTÕES 1000
                </h6>
              </div>
              <div
                className="flex items-center justify-center  rounded-md border-2  mb-8"
                style={{ borderColor: theme.color }}
              >
                <Image
                  src={deck.photo}
                  alt="foto do baralho"
                  width={44}
                  height={90}
                  className="w-full h-66 rounded-md"
                />
              </div>
              <h2
                className="text-center text-4xl font-bold mt-4 mb-8"
                style={{ color: theme.color }}
              >
                Fisica
              </h2>
              <div className="flex w-full justify-between mb-12">
                <div className="flex flex-col items-center justify-center">
                  <h6
                    className="text-2xl font-bold"
                    style={{ color: theme.color }}
                  >
                    Novos
                  </h6>
                  <h6
                    className="text-2xl font-bold"
                    style={{ color: theme.color }}
                  >
                    5
                  </h6>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h6
                    className="text-2xl font-bold"
                    style={{ color: theme.color }}
                  >
                    Aprender
                  </h6>
                  <h6
                    className="text-2xl font-bold"
                    style={{ color: theme.color }}
                  >
                    6
                  </h6>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h6
                    className="text-2xl font-bold"
                    style={{ color: theme.color }}
                  >
                    Revisar
                  </h6>
                  <h6
                    className="text-2xl font-bold"
                    style={{ color: theme.color }}
                  >
                    5
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between ">
          
          <Link
            className=" w-44 p-2 border-2 rounded-md text-2xl flex items-center gap-2 justify-center"
            style={{ borderColor: theme.color, color: theme.color }}
            href="/provas/baralho/1"
          >
            <LuPencilLine className="w-6 h-6" style={{fill:theme.color}} />
            Editar
          </Link>
          <button
            className=" w-44 p-2 border-2 rounded-md text-2xl flex items-center gap-2 justify-center"
            style={{ borderColor: theme.color, color: theme.color }}
            type="button"
            onClick={handleDelete}
          >
            <FaRegTrashAlt className="w-6 h-6" style={{fill:theme.color}} />
            Apagar
          </button>
          <Link
            className="  p-2 border-2 rounded-md text-2xl flex gap-2 items-center justify-center"
            style={{ borderColor: theme.color, color: theme.color }}
            href="/cartoes/baralho/1/estudar"
          >
            <PiStudentFill className="w-8 h-8" style={{fill:theme.color}} />
            Estudar
          </Link>
          
        </div>
      </div>
    </section>
  );
}
