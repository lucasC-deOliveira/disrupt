"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import Image from "next/image";
import { v4 } from "uuid";
import { SucessModal } from "@/app/componens/SuccessModal";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { LuFileJson } from "react-icons/lu";
import { TbJson } from "react-icons/tb";
import { useMyHeader } from "@/app/hooks/navigation";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";

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

const CREATE_CARD = gql`
  mutation CreateCard($data: CreateCardInput!) {
    createCard(data: $data) {
      id
    }
  }
`;

export default function AdicionarCartao({
  params,
}: {
  params: { id: string };
}) {
  const { theme } = useTheme();

  const [photo, setPhoto] = useState<File | null>(null);

  const [title, setTitle] = useState("");

  const [sucessModalIsOpen, setSucessModalIsOpen] = useState(false);

  const { replace } = useRouter();

  const [answer, setAnswer] = useState("");

  const [createCard, { data, loading, error }] = useMutation(CREATE_CARD);

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
        createCard({
          variables: {
            data: {
              photo: reader.result,
              title,
              answer,
              evaluation: "Very Hard",
              times: 0,
              showDataTime: new Date().toISOString(),
              deckId: params.id,
              type,
            },
          },
        })
          .then((result) => {
            setSucessModalIsOpen(true);

            setTimeout(() => {
              handleCloseSuccessModal();
              replace("/cartoes/baralho/" + params.id);
            }, 2000);
          })
          .catch((e): any => console.log(e.message));
      };
      photo && reader.readAsDataURL(photo);
    }
    if (type == "text") {
      createCard({
        variables: {
          data: {
            photo: "",
            title,
            answer,
            evaluation: "Very Hard",
            times: 0,
            showDataTime: new Date().toISOString(),
            deckId: params.id,
            type,
          },
        },
      })
        .then((result) => {
          setSucessModalIsOpen(true);

          setTimeout(() => {
            handleCloseSuccessModal();
            replace("/cartoes/baralho/" + params.id);
          }, 2000);
        })
        .catch((e): any => console.log(e.message));
    }
  };

  const { changePaths, changeTitle } = useMyHeader();

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
    <section className="w-full pl-16 pr-16  ">
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
          <LuFileJson className="w-6 h-6"/>
          Criar com
          <TbJson className="w-6 h-6" />
        </Link>
      </div>
      <form
        className="w-full border-2 rounded-lg"
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
            Criar
          </button>
        </div>
      </form>
      <SucessModal
        closeModal={handleCloseSuccessModal}
        isOpen={sucessModalIsOpen}
        message="Cartão criado com sucesso!"
      />
    </section>
  );
}
