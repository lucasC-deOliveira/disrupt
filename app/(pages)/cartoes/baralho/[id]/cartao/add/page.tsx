"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { CSSProperties, use, useEffect, useState } from "react";
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
import { AddVideosCardContainer } from "@/app/componens/AddVideosCardContainer";
import { FadeLoader } from "react-spinners";


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

  const [isLoadingCut, setIsLoadingCut] = useState(false)

  const id = use(params).id;

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: theme.color,
  };

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

  const [cut, setCut] = useState(false)

  const [cutTimer, setCutTimer] = useState(60)

  const [video, setVideo] = useState<File | null>(null);

  const [videos, setVideos] = useState<File[]>([])

  const base64ToFile = (base64: string, filename: string, mimeType = 'video/mp4'): File => {
    const byteString = atob(base64);
    const byteNumbers = new Array(byteString.length).fill(0).map((_, i) => byteString.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], filename, { type: mimeType });
  };

  const handleCut = () => {
    setIsLoadingCut(true)
    if (video) {
      const formData = new FormData();
      formData.append('file', video); // nome do campo esperado no NestJS: 'file'
      formData.append('chunkDuration', String(cutTimer));
      try {
        fetch('http://localhost:3333/videos/cut', {
          method: 'POST',
          body: formData,
        }).then(async response => {
          const result = await response.json();
          const segments = result?.chunks || []

          const blobFiles = segments.map((segment: string, i: number) => {
            return base64ToFile(segment, String(i))
          });
          setVideos(blobFiles)

          // base64 strings
        }).finally(() => {
          setIsLoadingCut(false)

        })


      } catch (error) {
        console.error('Erro ao enviar o vídeo:', error);
      }

    }

  }

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
        {isLoadingCut && (<div
          className="col-span-12 border-2 rounded-md p-8 bg-black   flex flex-col items-center justify-center  absolute top-96 z-30"
          style={{ color: theme.color, borderColor: theme.color }}
        >
          <FadeLoader
            color={theme.color}
            loading={true}
            cssOverride={override}
            aria-label="Carregando o card!"
            data-testid="loader"
          />
          Cortando o video!...
        </div>)}
      </div>

      <div className="w-full border-2 rounded-lg bg-black bg-opacity-95">
        <div className="flex gap-4 mt-8 mb-4 items-center ml-8 ">
          <label htmlFor="cartType"
            style={{ color: theme.color }}

          >Tipo:</label>
          <select
            id="cardType"
            name="cardType"
            value={type}
            onChange={(e) =>
              (e.target.value === "image" || e.target.value === "text" || e.target.value === "gif" || e.target.value === "video") &&
              setType(e.target.value)
            }
            className="bg-transparent border-2 rounded-md p-2"
            style={{ borderColor: theme.color, color: theme.color, outline: theme.color, }}
          >
            <option value="image">Com Imagem</option>
            <option value="text">Texto</option>
            <option value="video">Video</option>
          </select>

          {type == "video" && (
            <>
              <label
                style={{ color: theme.color }}
              > Cortar video</label>
              <input type="checkbox" className="bg-transparent border-2 rounded-md p-4 w-8 h-4 "
                style={{ borderColor: theme.color, outline: theme.color, }}
                checked={cut}
                onChange={e => setCut(e.target.checked)}
              />
              {cut && (<div className="w-auto">
                <input type="number" className="bg-transparent border-2 rounded-md p-2 w-20  "
                  style={{ borderColor: theme.color, color: theme.color, }}
                  value={cutTimer}
                  onChange={e => setCutTimer(Number(e.target.value))}
                />
                <label
                  style={{ color: theme.color }}
                > (s)</label>
                <button
                  className="bg-transparent border-2 rounded-md p-2 w-20 ml-4 "
                  style={{ borderColor: theme.color, color: theme.color, }}
                  disabled={isLoadingCut}
                  onClick={() => {
                    handleCut()
                  }}
                >Cortar</button>
              </div>)}
            </>
          )}
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
        {type === "video" && videos.length == 0 && (
          <AddVideoCardContainer
            deckId={id}
            errorCallback={() => { }}
            sucessCallback={sucessCallback}
            cutted={cut}
            handleVideoChange={(file) => setVideo(file)}
            video={video}
          />)
        }
        {type === "video" && videos.length > 0 && (
          <AddVideosCardContainer
            deckId={id}
            errorCallback={() => { }}
            sucessCallback={sucessCallback}
            cutted={cut}
            handleVideoChange={(file) => setVideo(file)}
            videos={videos}
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
