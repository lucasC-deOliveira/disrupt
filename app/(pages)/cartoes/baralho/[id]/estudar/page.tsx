"use client";

import lolCardPurple from "../../../../../../public/images/lolCardFramePurple.png";
import lolCardBlue from "../../../../../../public/images/lolCardFrameBlue.png";
import lolCardRed from "../../../../../../public/images/lolCardFrameRed.png";
import lolCardDarkBlue from "../../../../../../public/images/lolCardFrameDarkBlue.png";
import lolCardGold from "../../../../../../public/images/lolCardFrameGold.png";
import lolCardSilver from "../../../../../../public/images/lolCardFrameSilver.png";

import { CSSProperties, use, useEffect, useState } from "react";
import { CardContainer } from "@/app/componens/CardContainer";
import { useMyHeader } from "@/app/hooks/navigation";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import { useTheme } from "@/app/hooks/useTheme";
import { getVideo } from "@/app/utils/GetVideo";
import { getImage } from "@/app/utils/GetImage";
import { MdLibraryBooks } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { BsValentine2 } from "react-icons/bs";
import { Card } from "@/app/interfaces/Card";
import { FadeLoader } from "react-spinners";

import {
  answerCard,
  findCardsByDeckIdAndMostLateShowDataTimeAndQtd,
  getDeckById,
  syncDeckFromServerByDeckId,
  syncDeckToServer
} from "@/app/lib/pouchDb";


const cardFrame: any = {
  blue: lolCardBlue.src,
  purple: lolCardPurple.src,
  gold: lolCardGold.src,
  red: lolCardRed.src,
  darkBlue: lolCardDarkBlue.src,
  silver: lolCardSilver.src,
  "": "",
};


export default function EstudarBaralho({ params }: { params: Promise<{ id: string }> }) {
  const { theme } = useTheme();
  const [face, setFace] = useState<"frente" | "verso">("frente");
  const [card, setCard] = useState<Card>({} as Card);
  const { changePaths, changeTitle, changeBackButton } = useMyHeader();
  let [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const id = use(params).id;
  const canShowCard = !loading && card?.title
  const noMoreCards = !loading && !card?.title
  const isCardEmpty = cards.length <= 0
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: theme.color,
  };

  const handleShowAnswer = () => {
    setFace("verso");
  };

  const handleReset = () => {
    setFace("frente");
    setCard({} as Card);
  };

  const setHeader = async () => {
    const deck = await getDeckById(id)
    let deckTitle = "";
    if (deck) {
      deckTitle = deck.title;
    }
    changeTitle("Cartões");
    changeBackButton(true);
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
        name: deckTitle || "Baralho",
        Icon: BsValentine2,
        link: `/cartoes/baralho/${id}/`,
      },
      {
        name: "Estudar",
        Icon: PiStudentBold,
        link: `/cartoes/baralho/${id}/estudar`,
      },
    ]);

  }

  const initialize = async () => {
    setLoading(true);
    await syncDeckFromServerByDeckId(id)
    await setHeader()
    await getCards()
    setLoading(false);
  }
  const handleCardMidia = async (card: Card) => {
    if (card?.type === "video") {
      await getVideo(card)
    }
    else if (card?.type === "image") {
      await getImage(card)
    }
  }

  const handleCardsChange = (cards: Card[]) => {
    setCard(cards[0]);
    setCards(cards.slice(1, cards.length));
  }

  const getCards = async () => {
    const cards = await findCardsByDeckIdAndMostLateShowDataTimeAndQtd(id, 50)
    await handleCardMidia(cards[0])
    handleCardsChange(cards)
  }

  const evaluateAnswer = (
    evaluation: "Very Hard" | "Hard" | "Normal" | "Easy"
  ) => {
    return answerCard(id, card.id, evaluation).then(async () => {
      syncDeckToServer(id)
      setLoading(true);
      handleReset();

      if (!isCardEmpty) {
        await handleCardMidia(cards[0])
        handleCardsChange(cards);
        setLoading(false);
        return;
      }

      await getCards()
      setLoading(false);
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <section
      className="w-full grid grid-cols-12 pl-16 pr-16 bg-transparent "
    // style={{ background: theme.background }}
    >
      {loading && (
        <div
          className="col-span-12 mt-56 flex flex-col items-center justify-center"
          style={{ color: theme.color }}
        >
          <FadeLoader
            color={theme.color}
            loading={loading}
            cssOverride={override}
            aria-label="Carregando o card!"
            data-testid="loader"
          />
          Carregando o card!...
        </div>
      )}
      {canShowCard && (
        <div className="col-span-12 mt-20 rounded-md flex flex-col items-center justify-center">
          <CardContainer
            handleShowAnswer={handleShowAnswer}
            evaluateAnswer={evaluateAnswer}
            card={card}
            imageSrc={cardFrame[theme.cardFrame]}
            face={face}
            type={card.type}
          />
        </div>
      )}
      {noMoreCards && (
        <div className="col-span-12 flex items-center justify-center">
          <p className="my-96" style={{ color: theme.color }}>
            Não há mais cards para estudar!
          </p>
        </div>
      )}
    </section>
  );
}