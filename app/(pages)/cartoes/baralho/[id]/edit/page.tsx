"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import Image from "next/image";
import { v4 } from "uuid";
import { SucessModal } from "@/app/componens/SuccessModal";
import { useRouter } from "next/navigation";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import { useMyHeader } from "@/app/hooks/navigation";
import { MdLibraryBooks } from "react-icons/md";
import { BsValentine2 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { gql, useMutation, useQuery } from "@apollo/client";

interface Card {
  title: string;
  photo: string;
  answer: string;
  evaluation: string;
}

interface Deck {
  id: string;
  photo: string;
  title: string;
  cards: Card;
}

const GET_DECK_BY_ID = gql`
  query GetDeckById($id: String!) {
    getDeckById(id: $id) {
      title
      photo
    }
  }
`;

const EDIT_DECK = gql`
  mutation EditDeck($data: EditDeckInput!) {
    editDeck(data: $data) {
      id
    }
  }
`;

export default function EditarBaralho({ params }: { params: { id: string } }) {
  const { theme } = useTheme();

  const [photo, setPhoto] = useState("");

  const [title, setTitle] = useState("");

  const [sucessModalIsOpen, setSucessModalIsOpen] = useState(false);

  const { replace } = useRouter();

  const { id } = params;

  const { changePaths, changeTitle, changeBackButton } = useMyHeader();

  const [deck, setDeck] = useState<Deck>({} as Deck);

  const [editDeck] = useMutation(EDIT_DECK);

  const { loading, error, data, refetch } = useQuery(GET_DECK_BY_ID, {
    variables: { id: params.id },
  });

  useEffect(() => {
    if (data) {
      if (data?.getDeckById) {
        const newDeck = data.getDeckById;
        // console.log(newDeck.cards)
        setPhoto(deck.photo);
        setTitle(deck.title);
        setDeck(newDeck);
      }
      if (error?.message === "Failed to fetch") {
        refetch();
      }
    }
  }, [data, deck.photo, deck.title, error?.message, refetch]);

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
      {
        name: "Editar baralho",
        Icon: FaEdit,
        link: `/cartoes/baralho/${params.id}/edit`,
      },
    ]);

    changeBackButton(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivoSelecionado = e.target.files?.[0];
    if (arquivoSelecionado) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(String(reader.result));
      };
      reader.readAsDataURL(arquivoSelecionado);
    }
  };

  const handleCloseSuccessModal = () => {
    setSucessModalIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editDeck({
      variables: {
        data: {
          id: params.id,
          title: title,
          photo: photo,
        },
      },
    })
      .then(() => {
        setSucessModalIsOpen(true);

        setTimeout(() => {
          handleCloseSuccessModal();
          replace(`/cartoes/baralho/${id}`);
        }, 2000);
      })
      .catch((e) => {
        console.log("erro", e.message);
      });
  };

  return (
    <section className="col-span-12 grid grid-cols-12 pl-16 pr-16  ">
      <h3 className="text-2xl text-center col-start-6" style={{ color: theme.color }}>
        Editar Baralho
      </h3>
      <div
        className="col-span-12 grid grid-cols-12 pt-4  "
        style={{ borderColor: theme.color, color: theme.color }}
      >
        <form className="col-span-12 lg:col-span-5 lg:col-start-4 xl:col-span-3 xl:col-start-5" method="Post" onSubmit={handleSubmit}>
          <div
            className="w-full border-2 rounded-2xl px-8 pt-24  bg-black opacity-95 "
            style={{
              borderColor: theme.color,
              color: theme.color,
              height: 578 + "px",
            }}
          >
            <div
              className="w-full border-2 rounded-md flex  justify-center items-center relative"
              style={{ borderColor: theme.color, height: 200 + "px", }}
            >
              {!photo && <h3 className="text-2xl">Foto</h3>}
              {photo && (
                <Image
                  alt="foto do baralho"
                  src={photo}
                  width={500}
                  height={300}
                  className="w-full h-full rounded-md"
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
            <label
              htmlFor={"titulo"}
              className={`relative   block rounded-md border-2 h-24 px-2 mt-16 shadow-sm focus-within:border-white focus-within:ring-1 focus-within:ring-white`}
              style={{ borderColor: theme.color }}
            >
              <input
                type="text"
                id={"titulo"}
                className="peer border-none bg-transparent text-2xl placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full h-full"
                placeholder={"Titulo"}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-black p-0.5 text-2xl transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-2xl peer-focus:top-0 peer-focus:text-2xl"
                style={{ color: theme.color }}
              >
                Titulo
              </span>
            </label>
          </div>
          <div className="w-full flex justify-center items-center mt-4">
            <button
              className="border-2 rounded-md p-4 w-32  bg-black opacity-95"
              style={{ borderColor: theme.color, color: theme.color }}
              type="submit"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
      <SucessModal
        closeModal={handleCloseSuccessModal}
        isOpen={sucessModalIsOpen}
        message="Baralho editado com sucesso!"
      />
    </section>
  );
}
