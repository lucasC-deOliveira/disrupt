"use client";

import { useMyHeader } from "@/app/hooks/navigation";
import { useTheme } from "@/app/hooks/useTheme";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillCreditCard, AiOutlinePlus } from "react-icons/ai";
import { BiSolidHomeHeart } from "react-icons/bi";
import { BsValentine2 } from "react-icons/bs";
import { DiTravis } from "react-icons/di";
import { FaBoxOpen, FaRegTrashAlt } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { MdLibraryBooks } from "react-icons/md";

interface Card {
  photo: string;
  id: string;
  title: string;
}

interface Deck {
  title: string;
  cards: Card[];
}

const GET_DECK_BY_ID = gql`
  query GetDeckById($id: String!) {
    getDeckById(id: $id) {
      title
      cards {
        title
        id
        title
        photo
      }
    }
  }
`;

const DELETE_CARD_BY_ID = gql`
  mutation removeCard($id: String!) {
    removeCard(id: $id) {
      id
    }
  }
`;
export default function Cartoes({ params }: { params: { id: string } }) {
  const { theme } = useTheme();

  const { loading, error, data, refetch } = useQuery(GET_DECK_BY_ID, {
    variables: { id: params.id },
  });

  const [deleteCard, controllerDelete] = useMutation(DELETE_CARD_BY_ID);

  const [cards, setCards] = useState<Card[]>([]);

  const [deckTitle, setDeckTitle] = useState("");

  const { changePaths, changeTitle, changeBackButton } = useMyHeader();

  useEffect(() => {
    if (data) {
      if (data?.getDeckById) {
        const newDecks = data.getDeckById.cards;
        setCards(newDecks);
        setDeckTitle(data.getDeckById.title);
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
      {
        name: deckTitle ? deckTitle : "baralho",
        Icon: BsValentine2,
        link:`/cartoes/baralho/${params.id}`
      },
      {
        name: "Abrir baralho",
        Icon: FaBoxOpen,
        link:`/cartoes/baralho/${params.id}/cartoes`
      },
    ]);
    changeBackButton(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckTitle]);

  return (
    <section className="col-span-12 flex flex-col items-center md:block md:pl-16 md:pr-16  ">
      <div className="flex items-center justify-center  mb-4 mx-auto ">
        <h4
          className="text-2xl my-4 text-center"
          style={{ color: theme.color }}
        >
          Cartões do baralho {deckTitle}
        </h4>
      </div>
      <div className="w-full  rounded-md grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className=" border-2 rounded-md p-4 relative bg-black "
              style={{ borderColor: theme.color }}
            >
              {card?.photo && (
                <>
                  <div
                    className="flex items-center justify-center h-52 rounded-md border-2 mt-16  mb-8"
                    style={{ borderColor: theme.color }}
                  >
                    <Image
                      src={card.photo}
                      alt="foto do baralho"
                      width={44}
                      height={90}
                      className="w-full h-full rounded-md"
                    />
                  </div>
                  <h2
                    className="text-center text-2xl md:text-2xl break-words whitespace-normal break-all font-bold my-4 mb-16"
                    style={{ color: theme.color }}
                  >
                    {card.title}
                  </h2>
                </>
              )}
              {!card?.photo && (
                <h2
                  className="text-center text-2xl md:text-2xl break-words whitespace-normal break-all font-bold my-44"
                  style={{ color: theme.color }}
                >
                  {card.title}
                </h2>
              )}
              <div className="flex w-full justify-between gap-2 absolute left-0 bottom-4 px-4">
                <Link
                  className=" w-2/4 p-2 border-2 rounded-md text-md lg:text-xl  flex items-center gap-2 justify-center"
                  style={{ borderColor: theme.color, color: theme.color }}
                  href={`/cartoes/baralho/${params.id}/cartoes/${card.id}/edit`}
                >
                  <LuPencilLine
                    className="w-4 h-4  min-w-4 "
                    style={{ fill: theme.color }}
                  />
                  Editar
                </Link>
                <button
                  className=" w-2/4 p-2 border-2 rounded-md text-md lg:text-xl flex items-center gap-2 justify-center"
                  style={{ borderColor: theme.color, color: theme.color }}
                  type="button"
                  //   onClick={() => setDeleteModalIsOpen(true)}
                  onClick={() => {
                    deleteCard({ variables: { id: card.id } });
                    refetch();
                  }}
                >
                  <FaRegTrashAlt
                    className="w-4 min-w-4 h-4 "
                    style={{ fill: theme.color }}
                  />
                  Apagar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
