"use client";
import { useTheme } from "@/app/hooks/useTheme";
import Link from "next/link";
import Image from "next/image";
import { PiStudentFill } from "react-icons/pi";
import { AiFillCreditCard, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteModal } from "@/app/componens/DeleteModal";
import { SucessModal } from "@/app/componens/SuccessModal";
import { gql, useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { BiSolidHomeHeart } from "react-icons/bi";
import { useMyHeader } from "@/app/hooks/navigation";
import { MdLibraryBooks } from "react-icons/md";
import { BsValentine2 } from "react-icons/bs";
import { getAllDocs, getDocById, syncFromServer } from "@/app/lib/pouchDb";

interface Card {
  answer: string;
  photo: string;
  title: string;
  deckId: string;
  showDataTime: string;
  type: string;
  evaluation: string;
  times: number;
}

interface Deck {
  id: string;
  photo: string;
  title: string;
  cards: Card[];
}
const GET_DECK_BY_ID = gql`
  query GetDeckById($id: String!) {
    getDeckById(id: $id) {
      id
      title
      photo
      cards {
        times
        evaluation
        showDataTime
      }
    }
  }
`;

const REMOVE_DECK = gql`
  mutation RemoveDeck($id: String!) {
    removeDeck(id: $id) {
      id
    }
  }
`;

export default function Baralho({ params }: { params: { id: string } }) {
  const { theme } = useTheme();

  const [deck, setDeck] = useState<Deck>({} as Deck);

  // const { loading, error, data, refetch } = useQuery(GET_DECK_BY_ID, {
  //   variables: { id: params.id },
  // });

  const [removeDeck, removeDeckMutationController] = useMutation(REMOVE_DECK, {
    variables: { id: params.id },
  });

  const { changePaths, changeTitle, changeBackButton } = useMyHeader();

  const { replace } = useRouter();

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const handleCloseDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  // useEffect(() => {
  //   if (data) {
  //     if (data?.getDeckById) {
  //       const newDeck = data.getDeckById;
  //       // console.log(newDeck.cards)
  //       setDeck(newDeck);
  //     }
  //     if (error?.message === "Failed to fetch") {
  //       refetch();
  //     }
  //   }
  // }, [data, error?.message, refetch]);

  useEffect(() => {
    syncFromServer()
    getDocById(params.id)
      .then((decksResponse) => {
        if (decksResponse) {
          const newDeck: Deck = {
            title: decksResponse.title,
            photo: decksResponse.photo,
            id: decksResponse.id,
            cards: decksResponse.cards.map(card => ({
              answer: card.answer,
              photo: card.photo,
              title: card.title,
              showDataTime: card.showDataTime,
              evaluation: card.evaluation,
              times: card.times,
              id: card.id,
              deckId: decksResponse.id,
              type: 'default'
            }))
          };
          setDeck(newDeck);
        }
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
      {
        name: deck?.title ? deck.title : "baralho",
        Icon: BsValentine2,
        link: `/cartoes/baralho/${params.id}`,
      },
    ]);
    changeBackButton(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

  const handleDelete = () => {
    removeDeck().then(() => {
      handleCloseDeleteModal();

      setSuccessModalIsOpen(true);

      setTimeout(() => {
        handleCloseSuccessModal();
        replace("/cartoes");
      }, 2000);
    })
  };

  return (
    <section className="col-span-12  grid grid-cols-12 pl-16 pr-16 " >
      <DeleteModal
        actionFunction={handleDelete}
        closeModal={handleCloseDeleteModal}
        isOpen={deleteModalIsOpen}
        message="Você quer mesmo apagar o baralho e todos os seus cartões?"
      />
      <SucessModal
        closeModal={handleCloseSuccessModal}
        isOpen={successModalIsOpen}
        message="Baralho removido com sucesso!"
      />
      <div
        className="rounded-md flex flex-col items-center justify-center  gap-8 m-auto col-span-6 lg:col-span-5 lg:col-start-4 xl:col-span-5 xl:col-start-4 mt-8 "
      >
        <div className="w-full flex justify-end gap-2">
          <Link
            className="  p-2 border-2 rounded-md text-2xl flex items-center gap-2 justify-center bg-black"
            style={{ borderColor: theme.color, color: theme.color }}
            href={`/cartoes/baralho/${params.id}/cartao/add`}
          >
            <AiOutlinePlus className="w-8 h-8" style={{ fill: theme.color }} />
            Adicionar Cartões
          </Link>
          <Link
            className="  p-2 border-2 rounded-md text-2xl flex items-center gap-2 justify-center bg-black"
            style={{ borderColor: theme.color, color: theme.color }}
            href={`/cartoes/baralho/${params.id}/cartoes`}
          >
            {/* <AiOutlinePlus className="w-8 h-8" style={{ fill: theme.color }} /> */}
            Abrir Deck
          </Link>
        </div>
        <div
          className=" border-2 rounded-md  pr-1  w-full bg-black"
          style={{ borderColor: theme.color, height: 578 + "px" }}
        >
          <div
            className=" border-2 rounded-md h-full  pr-1"
            style={{ borderColor: theme.color }}
          >
            <div
              className=" border-2 rounded-md h-full  p-8"
              style={{ borderColor: theme.color }}
            >
              {" "}
              <div className="flex w-full justify-end mb-4">
                <h6
                  className="text-lg font-bold"
                  style={{ color: theme.color }}
                >
                  CARTÕES {deck.cards?.length || 0}
                </h6>
              </div>
              <div
                className="flex w-full items-center justify-center  rounded-md border-2  mb-8"
                style={{ borderColor: theme.color, height: 250 + "px" }}
              >
                <Image
                  src={deck.photo}
                  alt="foto do baralho"
                  width={400}
                  height={200}
                  className="w-full h-full rounded-md"
                />
              </div>
              <h2
                className="text-center text-4xl font-bold mt-12 mb-14"
                style={{ color: theme.color }}
              >
                {deck.title}
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
                    {deck?.cards?.filter((card) => card.times === 0).length ||
                      0}
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
                    className="text-2xl font-bold"
                    style={{ color: theme.color }}
                  >
                    Revisar
                  </h6>
                  <h6
                    className="text-2xl font-bold"
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
        </div>
        <div className="w-full flex justify-between ">
          <Link
            className=" w-44 p-2 border-2 rounded-md text-2xl flex items-center gap-2 justify-center bg-black"
            style={{ borderColor: theme.color, color: theme.color }}
            href={`/cartoes/baralho/${params.id}/edit`}
          >
            <LuPencilLine className="w-6 h-6" style={{ fill: theme.color }} />
            Editar
          </Link>
          <button
            className=" w-44 p-2 border-2 rounded-md text-2xl flex items-center gap-2 justify-center bg-black"
            style={{ borderColor: theme.color, color: theme.color }}
            type="button"
            onClick={() => setDeleteModalIsOpen(true)}
          >
            <FaRegTrashAlt className="w-6 h-6" style={{ fill: theme.color }} />
            Apagar
          </button>
          <Link
            className="  p-2 border-2 rounded-md text-2xl flex gap-2 items-center justify-center bg-black"
            style={{ borderColor: theme.color, color: theme.color }}
            href={`/cartoes/baralho/${params.id}/estudar`}
          >
            <PiStudentFill className="w-8 h-8" style={{ fill: theme.color }} />
            Estudar
          </Link>
        </div>
      </div>
    </section>
  );
}
