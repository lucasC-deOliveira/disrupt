"use client";

import { useMyHeader } from "@/app/hooks/navigation";
import { useTheme } from "@/app/hooks/useTheme";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillCreditCard, AiOutlinePlus } from "react-icons/ai";
import { BiSolidHomeHeart } from "react-icons/bi";
import dayjs from "dayjs";

interface Card {
  evaluation: string;
  showDataTime: Date;
  times: number;
}

interface Deck {
  id: string;
  photo: string;
  title: string;
  cards: Card[];
}
const GET_DECKS = gql`
  query {
    getAllDecks {
      id
      title
      photo
      cards {
        evaluation
        showDataTime
        times
      }
    }
  }
`;

export default function Cartoes() {
  const { theme } = useTheme();

  const { loading, error, data, refetch } = useQuery(GET_DECKS);

  const [decks, setDecks] = useState<Deck[]>([]);

  const { changeTitle, changePaths } = useMyHeader();

  useEffect(() => {
    if (data) {
      if (data?.getAllDecks) {
        const newDecks = data.getAllDecks;
        setDecks(newDecks);
      }
      if (error?.message === "Failed to fetch") {
        refetch();
      }
    }
  }, [data, error, refetch]);

  useEffect(() => {
    changeTitle("Cartões");
    changePaths([
      {
        name: "Home",
        Icon: BiSolidHomeHeart,
      },
      {
        name: "Cartões",
        Icon: AiFillCreditCard,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="col-span-12 flex flex-col items-center md:block md:pl-16 md:pr-16  ">
      <div className="flex items-center justify-center flex-col lg:flex-row mb-4 mx-auto relative">
        <h4
          className="text-2xl my-4 text-center"
          style={{ color: theme.color }}
        >
          Baralhos
        </h4>
        <Link
          className=" w-44 p-2 border-2 rounded-md flex gap-4 lg:absolute right-0 items-center justify-center self-end"
          style={{ borderColor: theme.color, color: theme.color }}
          href="/cartoes/baralho/cadastrar"
        >
          <AiOutlinePlus />
          Novo Baralho
        </Link>
      </div>
      <div className="w-full  rounded-md grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
        <Link
          href={"cartoes/baralho/cadastrar"}
          className=" border-2 rounded-md  pr-1"
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
              <div className="flex items-center justify-center w-full ">
                <AiOutlinePlus
                  className="w-72 h-72 "
                  style={{ fill: theme.color }}
                />
              </div>
              <h5
                className="text-2xl md:text-2xl lg:3xl xl:text-4xl font-bold mb-6 text-center"
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
              className=" border-2 rounded-md   pr-1"
              style={{ borderColor: theme.color }}
            >
              <div
                className=" border-2 rounded-md h-full  pr-1"
                style={{ borderColor: theme.color }}
              >
                <div
                  className=" border-2 rounded-md h-full  p-4"
                  style={{ borderColor: theme.color }}
                >
                  <div className="flex w-full justify-end mb-4">
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
                  <h2
                    className="text-center text-2xl md:text-4xl font-bold my-4"
                    style={{ color: theme.color }}
                  >
                    {deck.title}
                  </h2>
                  <div className="flex w-full justify-between gap-2 md:gap-4 ">
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
