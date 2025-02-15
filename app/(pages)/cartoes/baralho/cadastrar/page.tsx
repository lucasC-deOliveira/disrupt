"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import Image from "next/image";
import { v4 } from "uuid";
import { SucessModal } from "@/app/componens/SuccessModal";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { useMyHeader } from "@/app/hooks/navigation";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { addDoc } from "@/app/lib/pouchDb";

const CREATE_DECK = gql`
  mutation CreateDeck($data: CreateDeckInput!) {
    createDeck(data: $data) {
      id
      title
    }
  }
`;

export default function CadastrarBaralho() {
  const { theme } = useTheme();

  const [createDeck, { data, loading, error }] = useMutation(CREATE_DECK);

  const [photo, setPhoto] = useState<File | null>(null);

  const [title, setTitle] = useState("");

  const [sucessModalIsOpen, setSucessModalIsOpen] = useState(false);

  const { replace } = useRouter();

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

    const reader = new FileReader();
    reader.onload = () => {
      createDeck({ variables: { data: { photo: reader.result, title } } })
        .then((result) => {
          addDoc({
            id: result.data.createDeck.id,
            title: title,
            cards: [],
            _id: result.data.createDeck.id,
            photo: String(reader.result)
          })
          setSucessModalIsOpen(true);

          setTimeout(() => {
            handleCloseSuccessModal();
            replace("/cartoes");
          }, 2000);
        })
        .catch((e) => console.log("createDeckError", e.message));
    };
    photo && reader.readAsDataURL(photo);
  };

  const { changeTitle, changePaths, changeBackButton } = useMyHeader();

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
      { name: "Adicionar baralho", Icon: IoMdAddCircle, link: "/cartoes/baralho/cadastrar" },
    ]);

    changeBackButton(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full pl-16 pr-16  ">
      <h3 className="text-2xl text-center" style={{ color: theme.color }}>
        Criar Baralho
      </h3>
      <div
        className="w-full   flex flex-col items-center justify-center py-16  gap-8  "
        style={{ borderColor: theme.color, color: theme.color }}
      >
        <form className="w-full " method="Post" onSubmit={handleSubmit}>
          <div
            className="w-96 m-auto border-2 rounded-2xl px-8 pt-24  "
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
              className="border-2 rounded-md p-4 w-32"
              style={{ borderColor: theme.color, color: theme.color }}
              type="submit"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
      <SucessModal
        closeModal={handleCloseSuccessModal}
        isOpen={sucessModalIsOpen}
        message="Baralho criado com sucesso!"
      />
    </section>
  );
}
