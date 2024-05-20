"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useState } from "react";
import Image from "next/image";
import { v4 } from "uuid";
import { SucessModal } from "@/app/componens/SuccessModal";
import { useRouter } from "next/navigation";

interface Card {
  title:string,
  photo:string,
  answer:string
  evaluation:string
}

interface Deck {
  id: string;
  photo: string;
  title: string;
  cards:Card[]
}

export default function AdicionarCartao({ params }: { params: { id: string } }) {
  const { theme } = useTheme();

  const [photo, setPhoto] = useState<File | null>(null);

  const [title, setTitle] = useState("");

  const [sucessModalIsOpen, setSucessModalIsOpen] = useState(false);

  const { replace } = useRouter();

  const [answer, setAnswer] = useState("")

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

    const id = v4();

    let decks =
      JSON.parse(localStorage.getItem("@Disrupt/Baralhos") || "[]") || [];

    const deck = decks.find((x:Deck) => x.id === params.id)

    if(deck){
        const reader = new FileReader();
    reader.onload = () => {
      deck.cards = [...deck.cards, {
        id,
        title,
        answer,
        photo: reader.result
      }]

      localStorage.setItem("@Disrupt/Baralhos", JSON.stringify(decks));
    };
    photo && reader.readAsDataURL(photo);

    setSucessModalIsOpen(true);

    setTimeout(() => {
      handleCloseSuccessModal();
      replace("/cartoes/baralho/"+params.id);
    }, 2000);
  }
  };

  return (
    <section className="w-full pl-16 pr-16  ">
      <h3 className="text-2xl text-center mb-8" style={{ color: theme.color }}>
        Criar Cartão
      </h3>
      <form
        className="w-full border-2 rounded-lg"
        style={{ borderColor: theme.color, color: theme.color }}
        method="Post"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 mt-8 items-center ml-8">
          <label htmlFor="cartType">Tipo:</label>
          <select
            id="cardType"
            name="cardType"
            className="bg-transparent border-2 rounded-md p-2"
            style={{ borderColor: theme.color }}
          >
            <option>Com Imagem</option>
          </select>
        </div>
        <div className="w-full flex gap-8">
          <div className="w-full flex justify-center items-center flex-col">
            <h3 className="text-2xl font-bold">Frente</h3>
            <div
              className="w-full   flex flex-col items-center justify-center py-4  px-8 gap-8  "
              style={{ borderColor: theme.color, color: theme.color }}
            >
              <div className="w-full">
                <div
                  className="w-full border-2 rounded-2xl px-8 pt-24  "
                  style={{
                    borderColor: theme.color,
                    color: theme.color,
                    height: 728 + "px",
                  }}
                >
                  <div
                    className="w-full border-2 rounded-md flex h-80 justify-center items-center relative"
                    style={{ borderColor: theme.color }}
                  >
                    {!photo && <h3 className="text-2xl">Foto</h3>}
                    {photo && (
                      <Image
                        alt="foto do baralho"
                        src={URL.createObjectURL(photo)}
                        width={500}
                        height={300}
                        className="w-full h-full rounded-md"
                      />
                    )}
                    <input
                      type="file"
                      accept=".jpeg .jpg .png"
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
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center flex-col">
            <h3 className="text-2xl font-bold">Verso</h3>
            <div
              className="w-full   flex flex-col items-center justify-center py-4  px-8 gap-8  "
              style={{ borderColor: theme.color, color: theme.color }}
            >
              <div className="w-full">
                <div
                  className="w-full border-2 rounded-2xl flex justify-center items-center px-8   "
                  style={{
                    borderColor: theme.color,
                    color: theme.color,
                    height: 728 + "px",
                  }}
                >
                 
                  <label
                    htmlFor={"Resposta"}
                    className={`relative w-full  block rounded-md border-2 h-64 px-2  shadow-sm focus-within:border-white focus-within:ring-1 focus-within:ring-white`}
                    style={{ borderColor: theme.color }}
                  >
                    <textarea
                      id={"Resposta"}
                      className="peer border-none bg-transparent text-2xl p-8 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full h-full"
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
        </div>
        <div className="w-full flex justify-center items-center mt-4">
          <button
            className="border-2 rounded-md p-4 w-32"
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
