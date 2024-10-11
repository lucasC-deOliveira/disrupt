"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

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

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data?.getAllDecks) {
        const newDecks = data.getAllDecks;
        setDecks(newDecks);
      }
      if (error?.message === "Failed to fetch") {
        refetch();
      }
    }
  }, [data, error]);

  return (
    <section className="w-full pl-16 pr-16  ">
      <div className="flex items-center justify-center mb-4 relative">
        <h4
          className="text-2xl my-4 text-center"
          style={{ color: theme.color }}
        >
          Baralhos
        </h4>
        <Link
          className=" w-44 p-2 border-2 rounded-md flex gap-4 absolute right-0 items-center justify-center self-end"
          style={{ borderColor: theme.color, color: theme.color }}
          href="/cartoes/baralho/cadastrar"
        >
          <AiOutlinePlus />
          Novo Baralho
        </Link>
      </div>
      <div className="w-full  rounded-md grid grid-cols-4 gap-4 ">
        {decks.map((deck) => {
          console.log(deck);
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
                  className=" border-2 rounded-md h-full  p-8"
                  style={{ borderColor: theme.color }}
                >
                  <div className="flex w-full justify-end mb-4">
                    <h6 className="text-m" style={{ color: theme.color }}>
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
                    className="text-center text-4xl font-bold my-4"
                    style={{ color: theme.color }}
                  >
                    {deck.title}
                  </h2>
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col items-center justify-center">
                      <h6 className="text-md" style={{ color: theme.color }}>
                        Novos
                      </h6>
                      <h6 className="text-md" style={{ color: theme.color }}>
                        {deck?.cards?.filter((card) => card.times == 0)
                          ?.length || 0}
                      </h6>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h6 className="text-md" style={{ color: theme.color }}>
                        Aprender
                      </h6>
                      <h6 className="text-md" style={{ color: theme.color }}>
                        {deck?.cards?.filter(
                          (card) =>
                            (card.times > 0 &&
                              new Date(card.showDataTime).getTime() <=
                                new Date().getTime() &&
                              card.evaluation == "Very Hard") ||
                            card.evaluation == "Hard"
                        ).length || 0}
                      </h6>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h6 className="text-md" style={{ color: theme.color }}>
                        Revisar
                      </h6>
                      <h6 className="text-md" style={{ color: theme.color }}>
                        {
                          deck?.cards?.filter(
                            (card) =>
                              new Date(card.showDataTime).getTime() <=
                                new Date().getTime() &&
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
              <AiOutlinePlus
                className="w-72 h-72"
                style={{ fill: theme.color }}
              />
              <h5
                className="text-4xl font-bold mb-6"
                style={{ color: theme.color }}
              >
                Novo Baralho
              </h5>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
