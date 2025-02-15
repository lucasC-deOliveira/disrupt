"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { use, useEffect, useState } from "react";
import { SucessModal } from "@/app/componens/SuccessModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LuFileJson } from "react-icons/lu";
import { TbJson } from "react-icons/tb";
import { useMyHeader } from "@/app/hooks/navigation";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { BsValentine2 } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { AddTextCardContainer } from "@/app/componens/AddTextCardContainer";
import { AddImageCardContainer } from "@/app/componens/AddImageCardContainer";
import { AddVideoCardContainer } from "@/app/componens/AddVideoCardContainer";


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


export default function AdicionarCartao({ params }: { params: Promise<{ id: string }> }) {
  const { theme } = useTheme();


  const [sucessModalIsOpen, setSucessModalIsOpen] = useState(false);

  const { replace } = useRouter();


  const [type, setType] = useState<"image" | "text" | "video" | "gif">("text");

  const id = use(params).id;

  const handleCloseSuccessModal = () => {
    setSucessModalIsOpen(false);
  };

  const sucessCallback = () => {
    setSucessModalIsOpen(true);

    setTimeout(() => {
      handleCloseSuccessModal();
      replace("/cartoes/baralho/" + id);
    }, 2000);
  };

  const { changePaths, changeTitle, changeBackButton } = useMyHeader();


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
        link: '/cartoes'
      },
      {
        name: "baralho",
        Icon: BsValentine2,
        link: `/cartoes/baralho/${id}`
      },
      {
        name: "Adicionar cartão",
        Icon: IoMdAddCircle,
        link: `/cartoes/baralho/${id}/cartao/add`
      },

    ]);
    changeBackButton(true);

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
          className=" w-44 p-2 border-2 rounded-md flex gap-4 lg:absolute right-0 items-center justify-center self-end bg-black bg-opacity-95"
          style={{ borderColor: theme.color, color: theme.color }}
          href={`/cartoes/baralho/${id}/cartao/add/json`}
        >
          <LuFileJson className="w-6 h-6" />
          Criar com
          <TbJson className="w-6 h-6" />
        </Link>
      </div>
      <div className="w-full border-2 rounded-lg bg-black bg-opacity-95">
        <div className="flex gap-4 mt-8 mb-4 items-center ml-8">
          <label htmlFor="cartType">Tipo:</label>
          <select
            id="cardType"
            name="cardType"
            value={type}
            onChange={(e) =>
              (e.target.value === "image" || e.target.value === "text" || e.target.value === "gif" || e.target.value === "video") &&
              setType(e.target.value)
            }
            className="bg-transparent border-2 rounded-md p-2"
            style={{ borderColor: theme.color }}
          >
            <option value="image">Com Imagem</option>
            <option value="text">Texto</option>
            <option value="video">Video</option>
          </select>
        </div>
        {type === "text" && (
          <AddTextCardContainer
            deckId={id}
            errorCallback={() => { }}
            sucessCallback={sucessCallback}
          />)
        }

        {type === "image" && (
          <AddImageCardContainer
            deckId={id}
            errorCallback={() => { }}
            sucessCallback={sucessCallback}
          />)
        }
         {type === "video" && (
          <AddVideoCardContainer
            deckId={id}
            errorCallback={() => { }}
            sucessCallback={sucessCallback}
          />)
        }
      </div>
      <SucessModal
        closeModal={handleCloseSuccessModal}
        isOpen={sucessModalIsOpen}
        message="Cartão criado com sucesso!"
      />
    </section>
  );
}
