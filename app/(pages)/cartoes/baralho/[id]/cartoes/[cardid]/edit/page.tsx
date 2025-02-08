"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { v4 } from "uuid";
import { SucessModal } from "@/app/componens/SuccessModal";
import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import { useMyHeader } from "@/app/hooks/navigation";
import { MdLibraryBooks } from "react-icons/md";
import { BsValentine2 } from "react-icons/bs";
import { FaBoxOpen, FaEdit } from "react-icons/fa";

interface Card {
  answer: string;
  photo: string;
  title: string;
}

interface Deck {
  id: string;
  photo: string;
  title: string;
  cards: Card[];
}

const EDIT_CARD = gql`
  mutation EditCard($data: EditCardInput!) {
    editCard(data: $data) {
      id
    }
  }
`;

const GET_CARD_BY_ID = gql`
  query GetCardById($id: String!) {
    getCardById(id: $id) {
      answer
      photo
      title
    }
  }
`;

function base64ToFile(base64String: string, fileName: string) {
  // Divida a string base64 em partes (data:...;base64,...)
  const arr = base64String.split(",");
  // @ts-ignore
  const mimeType = arr[0].match(/:(.*?);/); // Extraia o tipo MIME
  const byteString = atob(arr[1]); // Decodifica a parte base64

  // Converte a string base64 para um array de bytes
  const byteNumbers = new Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }

  // Crie um array de bytes do tipo Uint8Array
  const byteArray = new Uint8Array(byteNumbers);

  // Crie um Blob a partir do Uint8Array e defina o tipo MIME
  // @ts-ignore

  const blob = new Blob([byteArray], { type: mimeType });

  // Retorne um objeto File a partir do Blob
  // @ts-ignore
  return new File([blob], fileName, { type: mimeType });
}

export default function EditarCartao({ params }: { params: Promise<{ id: string, cardid: string }> }) {
  const { theme } = useTheme();

  const [photo, setPhoto] = useState<File | null>(null);

  const [title, setTitle] = useState("");

  const [sucessModalIsOpen, setSucessModalIsOpen] = useState(false);

  const { replace } = useRouter();

  const [answer, setAnswer] = useState("");

  const [editCard, editControll] = useMutation(EDIT_CARD);

  const [card, setCard] = useState({} as Card);

  const { changePaths, changeTitle, changeBackButton } = useMyHeader();

  const id = use(params).id;

  const cardid = use(params).cardid;

  const { loading, error, data, refetch } = useQuery(GET_CARD_BY_ID, {
    variables: { id: cardid},
  });

  const [type, setType] = useState<"with image" | "text">("text");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivoSelecionado = e.target.files?.[0];
    if (arquivoSelecionado) {
      setPhoto(arquivoSelecionado);
    }
  };

  const handleCloseSuccessModal = () => {
    setSucessModalIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (type == "with image") {
      const reader = new FileReader();
      reader.onload = () => {
        editCard({
          variables: {
            data: {
              photo: reader.result == card.photo ? card.photo : reader.result,
              title,
              answer,
              id: cardid,
            },
          },
        })
          .then((result) => {
            setSucessModalIsOpen(true);

            setTimeout(() => {
              handleCloseSuccessModal();
              replace("/cartoes/baralho/" + id + "/cartoes");
            }, 2000);
          })
          .catch((e): any => console.log(e.message));
      };
      photo && reader.readAsDataURL(photo);
    }
    if (type == "text") {
      editCard({
        variables: {
          data: {
            photo: "",
            title,
            answer,
            type,
          },
        },
      })
        .then((result) => {
          setSucessModalIsOpen(true);

          setTimeout(() => {
            handleCloseSuccessModal();
            replace(`/cartoes/baralho/${id}/cartoes`);
          }, 2000);
        })
        .catch((e): any => console.log(e.message));
    }
  };

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
        name: "baralho",
        Icon: BsValentine2,
        link: `/cartoes/baralho/${id}`,
      },
      
      {
        name: "Abrir baralho",
        Icon: FaBoxOpen,
        link: `/cartoes/baralho/${id}/cartoes`,
      },
      {
        name: "Editar cartão",
        Icon: FaEdit,
        link: `/cartoes/baralho/${id}/cartoes/${cardid}/edit`,
      },
      
    ]);
    changeBackButton(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      if (data?.getCardById) {
        const GetCardById = data.getCardById;
        const newCard: Card = {
          answer: GetCardById.answer,
          photo: GetCardById.photo,
          title: GetCardById.title,
        };
        setType(newCard?.photo ? "with image" : "text");
        newCard?.photo && setPhoto(base64ToFile(newCard.photo, "photo"));
        setTitle(newCard.title);
        setAnswer(newCard.answer);
        setCard(newCard);
      }

      if (error?.message === "Failed to fetch") {
        refetch();
      }
    }
  }, [data, error?.message, id, refetch]);

  return (
    <section className="w-full pl-16 pr-16  ">
      <h3 className="text-2xl text-center mb-8" style={{ color: theme.color }}>
        Editar Cartão
      </h3>
      <form
        className="w-full border-2 rounded-lg bg-black opacity-90"
        style={{ borderColor: theme.color, color: theme.color }}
        method="Post"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 mt-8 mb-4 items-center ml-8">
          <label htmlFor="cartType">Tipo:</label>
          <select
            id="cardType"
            name="cardType"
            value={type}
            onChange={(e) =>
              (e.target.value === "with image" || e.target.value === "text") &&
              setType(e.target.value)
            }
            className="bg-transparent border-2 rounded-md p-2"
            style={{ borderColor: theme.color }}
          >
            <option value="with image">Com Imagem</option>
            <option value="text">Texto</option>
          </select>
        </div>
        <div className="col-span-12 grid grid-cols-12">
          <div className="col-span-12 lg:col-span-6 flex justify-center items-center flex-col">
            <h3 className="text-2xl font-bold ">Frente</h3>
            <div className="grid grid-cols-12 ">
              <div
                className={`col-span-12 border-2 rounded-2xl px-8 pb-8   
                 `}
                style={{
                  borderColor: theme.color,
                  color: theme.color,
                }}
              >
                {type === "with image" && (
                  <>
                    <div
                      className="w-full border-2 rounded-md flex h-48 justify-center items-center relative mt-16"
                      style={{ borderColor: theme.color }}
                    >
                      {!photo && <h3 className="text-2xl">Foto</h3>}
                      {photo && (
                        <Image
                          alt="foto do baralho"
                          src={URL.createObjectURL(photo)}
                          width={400}
                          height={250}
                          className="w-full h-full rounded-md"
                        />
                      )}
                      <input
                        type="file"
                        accept="images/*"
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
                  </>
                )}
                {type === "text" && (
                  <label
                    htmlFor={"titulo"}
                    className={`relative w-full   block rounded-md border-2 mb-36 mt-40 h-36 px-2  shadow-sm focus-within:border-white focus-within:ring-1 focus-within:ring-white`}
                    style={{ borderColor: theme.color }}
                  >
                    <textarea
                      id={"titulo"}
                      className="peer border-none bg-transparent text-2xl p-8 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full h-full"
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
                )}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 flex justify-center items-center flex-col">
            <h3 className="text-2xl font-bold">Verso</h3>

            <div className="grid grid-cols-12  ">
              <div
                className="col-span-12 border-2 rounded-2xl flex justify-center items-center px-8  py-40 "
                style={{
                  borderColor: theme.color,
                  color: theme.color,
                }}
              >
                <label
                  htmlFor={"Resposta"}
                  className={`relative w-full text-center  block rounded-md border-2 h-36 px-2  shadow-sm focus-within:border-white focus-within:ring-1 focus-within:ring-white`}
                  style={{ borderColor: theme.color }}
                >
                  <textarea
                    id={"Resposta"}
                    className="peer border-none bg-transparent text-2xl text-center placeholder:text-center p-8 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full h-full"
                    placeholder={"Resposta"}
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                  />

                  <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-black p-0.5 text-2xl transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-2xl peer-focus:top-0 peer-focus:text-2xl"
                    style={{ color: theme.color }}
                  >
                    Resposta
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-4">
          <button
            className="border-2 rounded-md p-4 w-32 mb-6"
            style={{ borderColor: theme.color, color: theme.color }}
            type="submit"
          >
            Editar
          </button>
        </div>
      </form>
      <SucessModal
        closeModal={handleCloseSuccessModal}
        isOpen={sucessModalIsOpen}
        message="Cartão editado com sucesso!"
      />
    </section>
  );
}
