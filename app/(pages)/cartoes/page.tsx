"use client";

import { useMyHeader } from "@/app/hooks/navigation";
import { useTheme } from "@/app/hooks/useTheme";
// import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillCreditCard, AiOutlinePlus } from "react-icons/ai";
import { BiSolidHomeHeart } from "react-icons/bi";
import dayjs from "dayjs";
import { MdLibraryBooks } from "react-icons/md";
import { BsFiletypeJson } from "react-icons/bs";
import { getAllDocs, syncFromServer } from '../../lib/pouchDb';
import { Textfit } from "react-textfit";


interface Card {
  evaluation: string;
  showDataTime: Date;
  times: number;
  title: string;
  photo?: string;
  answer: string;
  id: string;
}

interface Deck {
  id: string;
  photo: string;
  title: string;
  cards: Card[];
}
// const GET_DECKS = gql`
// query {
//   getAllDecks {
//     id
//     title
//     photo
//     cards {
//       answer
//       photo
//       title
//       showDataTime
//       evaluation
//       times
//       id
//     }
//   }
// }
// `;
const exportDecksInJson = (decks: Deck[]) => {
  const jsonString = JSON.stringify(decks, null, 2);

  // Cria um blob com o tipo MIME 'application/json'
  const blob = new Blob([jsonString], { type: "application/json" });

  // Cria uma URL para o blob
  const url = URL.createObjectURL(blob);

  // Cria um link invisível
  const link = document.createElement("a");
  link.href = url;

  // Nome do arquivo para download
  link.download = "cards.json";

  // Simula o clique no link
  link.click();

  // Libera a URL após o download
  URL.revokeObjectURL(url);
}

export default function Cartoes() {
  const { theme } = useTheme();


  const [decks, setDecks] = useState<Deck[]>([]);


  const { changeTitle, changePaths, changeBackButton } = useMyHeader();

  useEffect(() => {
    syncFromServer()
    getAllDocs()
      .then((decksResponse) => {
        const newDecks = decksResponse
          .map(deck => ({
            title: deck.title,
            photo: deck.photo || '',
            id: deck.id,
            cards: deck.cards.map(card => ({
              answer: card.answer,
              title: card.title,
              showDataTime: new Date(card.showDataTime),
              evaluation: card.evaluation,
              times: card.times,
              id: card.id,
              type: card.type
            }))
          }))
        setDecks(newDecks);
      })
  }, []);

  useEffect(() => {
    changeTitle("Cartões");
    changePaths([
      {
        name: "Home",
        Icon: BiSolidHomeHeart,
        link: "/cartoes",
      },
      {
        name: "Cartões",
        Icon: AiFillCreditCard,
        link: "/cartoes",
      },
      {
        name: "Baralhos",
        Icon: MdLibraryBooks,
        link: "/cartoes",
      },
    ]);
    changeBackButton(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="col-span-12 flex flex-col items-center md:block md:pl-16 md:pr-16  ">
      <div className="flex items-center justify-center flex-col lg:flex-row mb-4 mx-auto relative">
        <h4
          className="text-2xl my-4 font-bold text-center"
          style={{ color: theme.color }}
        >
          Baralhos
        </h4>
        <div className="lg:absolute right-0 flex items-center gap-4">
          <Link
            className=" w-44 p-2 border-2 rounded-md flex gap-4  items-center justify-center self-end bg-black"
            style={{ borderColor: theme.color, color: theme.color }}
            href="/cartoes/baralho/cadastrar"
          >
            <AiOutlinePlus />
            Novo Baralho
          </Link>
          <button
            className=" w-44 p-2 border-2 rounded-md flex gap-4  items-center justify-center self-end bg-black"
            style={{ borderColor: theme.color, color: theme.color }}
            onClick={() => exportDecksInJson(decks)}
          >
            <BsFiletypeJson />
            Exportar Cartoes
          </button>
          <Link
            className=" w-44 p-2 border-2 rounded-md flex gap-4  items-center justify-center self-end bg-black"
            style={{ borderColor: theme.color, color: theme.color }}
            href="/cartoes/baralho/cadastrar/importar"
          >
            <AiOutlinePlus />
            Importar Cartoes
          </Link>
        </div>
      </div>
      <div className="w-full  rounded-md grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
        <Link
          href={"cartoes/baralho/cadastrar"}
          className=" border-2 rounded-md  pr-1 bg-black"
          style={{ borderColor: theme.color }}
        >
          <div
            className=" border-2 rounded-md h-full  pr-1"
            style={{ borderColor: theme.color }}
          >
            <div
              className=" border-2 rounded-md  h-full  p-8 flex flex-col items-center gap-4"
              style={{ borderColor: theme.color }}
            >
              <div className="flex items-center justify-center w-full  ">
                <AiOutlinePlus
                  className="w-72 h-72 "
                  style={{ fill: theme.color }}
                />
              </div>
              <h5
                className="text-2xl md:text-2xl lg:3xl xl:text-4xl font-bold mb-6 text-center "
                style={{ color: theme.color }}
              >
                Novo Baralho
              </h5>
            </div>
          </div>
        </Link>
        {decks.map((deck) => {
          return (
            <Link
              key={deck.id}
              href={"cartoes/baralho/" + deck.id}
              className=" border-2 rounded-md   pr-1 bg-black"
              style={{ borderColor: theme.color }}
            >
              <div
                className=" border-2 rounded-md h-full  pr-1 "
                style={{ borderColor: theme.color }}
              >
                <div
                  className=" border-2 rounded-md h-full  p-4 relative"
                  style={{ borderColor: theme.color }}
                >
                  <div className="flex w-full justify-end mb-4 ">
                    <h6
                      className="text-sm md:text-md mb-4"
                      style={{ color: theme.color }}
                    >
                      CARTÕES {deck.cards?.length || 0}
                    </h6>
                  </div>
                  <div
                    className="flex items-center justify-center h-52 rounded-md border-2  mb-8"
                    style={{ borderColor: theme.color }}
                  >
                    <Image
                      src={deck.photo}
                      alt="foto do baralho"
                      width={44}
                      height={90}
                      className="w-full h-full rounded-md"
                    />
                  </div>

                  <Textfit
                    mode="multi"
                    forceSingleModeWidth={false}
                    max={28}  // tamanho máximo da fonte desejado
                    min={26}
                    style={{
                      color: theme.color, whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      fontSize: 100,
                      marginTop: 12,
                      marginBottom: 80,
                      maxWidth: 400
                    }}
                    className="text-center font-bold"
                  >
                    {deck.title}
                  </Textfit>
                  <div className="flex w-full justify-around gap-2 md:gap-4 absolute bottom-0 left-0 mb-4">
                    <div className="flex flex-col items-center justify-center">
                      <h6
                        className="text-sm md:text-md"
                        style={{ color: theme.color }}
                      >
                        Novos
                      </h6>
                      <h6
                        className="text-sm md:text-md"
                        style={{ color: theme.color }}
                      >
                        {deck?.cards?.filter((card) => card.times == 0)
                          ?.length || 0}
                      </h6>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h6
                        className="text-sm md:text-md"
                        style={{ color: theme.color }}
                      >
                        Aprender
                      </h6>
                      <h6
                        className="text-sm md:text-md"
                        style={{ color: theme.color }}
                      >
                        {deck?.cards?.filter(
                          (card) =>
                            (card.times > 0 &&
                              dayjs(card.showDataTime).isBefore(dayjs()) &&
                              card.evaluation == "Very Hard") ||
                            card.evaluation == "Hard"
                        ).length || 0}
                      </h6>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h6
                        className="text-sm md:text-md"
                        style={{ color: theme.color }}
                      >
                        Revisar
                      </h6>
                      <h6
                        className="text-sm md:text-md"
                        style={{ color: theme.color }}
                      >
                        {
                          deck?.cards?.filter(
                            (card) =>
                              dayjs(card.showDataTime).isBefore(dayjs()) &&
                              card.times > 0 &&
                              (card.evaluation === "Normal" ||
                                card.evaluation === "Easy")
                          ).length
                        }
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
