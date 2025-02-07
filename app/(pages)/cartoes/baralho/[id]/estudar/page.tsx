"use client";

import { useTheme } from "@/app/hooks/useTheme";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import { useMyHeader } from "@/app/hooks/navigation";
import { BsValentine2 } from "react-icons/bs";
import { MdLibraryBooks } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import lolCardPurple from "../../../../../../public/images/lolCardFramePurple.png";
import lolCardBlue from "../../../../../../public/images/lolCardFrameBlue.png";
import lolCardRed from "../../../../../../public/images/lolCardFrameRed.png";
import lolCardDarkBlue from "../../../../../../public/images/lolCardFrameDarkBlue.png";
import lolCardGold from "../../../../../../public/images/lolCardFrameGold.png";
import lolCardSilver from "../../../../../../public/images/lolCardFrameSilver.png";
import { answerCard, findCardByDeckIdAndMostLateShowDataTime, findCardsByDeckIdAndMostLateShowDataTimeAndQtd, getDeckById, syncDeckToServer, syncFromServer } from "@/app/lib/pouchDb";
import { CardFront } from "@/app/componens/CardComponentFront";
import { CardBack } from "@/app/componens/CardComponentBack";
import { Card } from "@/app/interfaces/Card";

const cardFrame: any = {
  blue: lolCardBlue.src,
  purple: lolCardPurple.src,
  gold: lolCardGold.src,
  red: lolCardRed.src,
  darkBlue: lolCardDarkBlue.src,
  silver: lolCardSilver.src,
  "": "",
};

export default function EstudarBaralho({ params }: { params: { id: string } }) {
  const { theme } = useTheme();
  const [face, setFace] = useState<"frente" | "verso">("verso");
  const [card, setCard] = useState<Card>({} as Card);
  const { changePaths, changeTitle, changeBackButton } = useMyHeader();
  let [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: theme.color,
  };

  const handleShowAnswer = () => {
    setFace("verso");
  };
  const evaluateAnswer = (
    evaluation: "Very Hard" | "Hard" | "Normal" | "Easy"
  ) => {
    return answerCard(params.id, card.id, evaluation).then(() => {
      syncDeckToServer(params.id)
      setLoading(true);
      setFace("frente");
      setCard({} as Card);

      if (cards.length > 0) {
        setCard(cards[0]);
        setCards(cards.slice(1, cards.length));
        setLoading(false);
      }
      else {
        findCardsByDeckIdAndMostLateShowDataTimeAndQtd(params.id, 50).then((cards) => {
          if (cards.length > 0) {
            setCard(cards[0]);
          }
          setCards(cards.slice(1, cards.length));
          setLoading(false);
        })
      }


    });
  };

  useEffect(() => {
    syncFromServer()
    findCardsByDeckIdAndMostLateShowDataTimeAndQtd(params.id, 50).then((cards) => {
      if (cards.length > 0) {
        setCard(cards[0]);
      }
      setCards(cards.slice(1, cards.length));
      setLoading(false);
    })

    getDeckById(params.id).then((deck) => {
      let deckTitle = "";

      if (deck) {
        deckTitle = deck.title;
      }
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
          link: `/cartoes/baralho/${params.id}/`,
        },
        {
          name: "Estudar",
          Icon: PiStudentBold,
          link: `/cartoes/baralho/${params.id}/estudar`,
        },
      ]);
    });
    changeTitle("Cartões");

    changeBackButton(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {!loading && card?.title && (
        <div className="col-span-12 mt-20 rounded-md flex flex-col items-center justify-center py-4 relative ">
          {!!cardFrame[theme.cardFrame] && (
            <>
              <div
                className="-top-6 mt-9 absolute z-180 bg-black "
                style={{ width: 350, height: 650 }}
              ></div>
              <Image
                src={cardFrame[theme.cardFrame]}
                alt="a"
                width={500}
                height={400}
                className=" -top-6 absolute z-2 "
                objectFit="cover"
                objectPosition="center"
                style={{
                  width: 400,
                  height: 700,
                  minHeight: 400,
                  minWidth: 400,
                  maxWidth: 400,
                  backgroundSize: "cover",
                }}
              />
            </>
          )}

          {face == "frente" && (
            <CardFront
              card={card}
              handleShowAnswer={handleShowAnswer}
            />
          )}
          {face == "verso" && (
            <CardBack
              card={card}
              evaluateAnswer={evaluateAnswer}
            />
          )}
        </div>
      )}
      {!loading && !card?.title && (
        <div className="col-span-12 flex items-center justify-center">
          <p className="my-96" style={{ color: theme.color }}>
            Não há mais cards para estudar!
          </p>
        </div>
      )}
    </section>
  );
}
