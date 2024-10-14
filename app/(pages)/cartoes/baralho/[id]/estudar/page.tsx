"use client";

import { useTheme } from "@/app/hooks/useTheme";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { PacmanLoader } from "react-spinners";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import { useMyHeader } from "@/app/hooks/navigation";

interface Card {
  answer: string;
  photo: string;
  title: string;
  deckId: string;
  showDataTime: string;
  evaluation: string;
  times: number;
  id: string;
}

const GET_CARD_BY_DECK_ID = gql`
  query GetCardByDeckId($id: String!, $itemsPerPage: String!, $page: String!) {
    getAllCardsByDeckid(id: $id, page: $page, itemsPerPage: $itemsPerPage) {
      answer
      photo
      title
      showDataTime
      evaluation
      times
      id
    }
  }
`;

const EDIT_CARD_EVALUATION = gql`
  mutation AnswerCard($id: String!, $evaluation: String!) {
    answerCard(data: { id: $id, evaluation: $evaluation }) {
      id
      evaluation
    }
  }
`;

export default function EstudarBaralho({ params }: { params: { id: string } }) {
  const { theme } = useTheme();
  const [face, setFace] = useState<"frente" | "verso">("frente");
  const [card, setCard] = useState<Card>({} as Card);
  const [answerCard] = useMutation(EDIT_CARD_EVALUATION);
  const { changePaths, changeTitle } = useMyHeader();

  const { loading, error, data, refetch } = useQuery(GET_CARD_BY_DECK_ID, {
    variables: { id: params.id, itemsPerPage: "1", page: "1" },
  });

  const handleShowAnswer = () => {
    setFace("verso");
  };

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

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: theme.color,
  };

  const evalStrategy = {
    "Very Hard": 60,
    Hard: 5 * 60,
    Normal:
      card?.times > 1 &&
      card?.evaluation === "Normal" &&
      60 * 30 * (card?.times + 1) < 259200
        ? 60 * 30 * (card?.times + 1)
        : 259200,
    Easy:
      card?.times > 1 &&
      card?.evaluation === "Easy" &&
      60 * 60 * 24 * 3 * (card?.times + 1) < 7776000
        ? 60 * 60 * 24 * 3 * (card?.times + 1)
        : 7776000,
  };

  function formatTime(seconds: number) {
    const SECONDS_IN_MINUTE = 60;
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_MONTH = 2592000;
    // Calcula a quantidade de cada unidade de tempo
    const months = Math.floor(seconds / SECONDS_IN_MONTH);
    seconds %= SECONDS_IN_MONTH;
    const days = Math.floor(seconds / SECONDS_IN_DAY);
    seconds %= SECONDS_IN_DAY;
    const hours = Math.floor(seconds / SECONDS_IN_HOUR);
    seconds %= SECONDS_IN_HOUR;
    const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);

    // Monta a string de resultado
    const result = [];
    if (months > 0) result.push(`${months} ${months === 1 ? "mês" : "meses"}`);
    if (days > 0) result.push(`${days} ${days === 1 ? "dia" : "dias"}`);
    if (hours > 0) result.push(`${hours} ${hours === 1 ? "hora" : "horas"}`);
    if (minutes > 0) result.push(`${minutes} ${minutes === 1 ? "min" : "min"}`);

    // Retorna a string formatada
    return result.join(", ");
  }

  const evaluateAnswer = (
    evaluation: "Very Hard" | "Hard" | "Normal" | "Easy"
  ) => {
    return answerCard({ variables: { id: card.id, evaluation } }).then(() => {
      refetch();
      setFace("frente");
      setCard({} as Card);
    });
  };

  useEffect(() => {
    if (data) {
      if (data?.getAllCardsByDeckid) {
        const GetCardByDeckId = data.getAllCardsByDeckid;
        if (GetCardByDeckId.length > 0) {
          const newCard = {
            answer: GetCardByDeckId[0].answer,
            deckId: params.id,
            evaluation: GetCardByDeckId[0].evaluation,
            photo: GetCardByDeckId[0].photo,
            showDataTime: GetCardByDeckId[0].showDataTime,
            times: GetCardByDeckId[0].times,
            title: GetCardByDeckId[0].title,
            id: GetCardByDeckId[0].id,
          };
          setCard(newCard);
        }
      }

      if (error?.message === "Failed to fetch") {
        refetch();
      }
    }
  }, [data, error?.message, params.id, refetch]);

  return (
    <section className="w-full grid grid-cols-12 pl-16 pr-16 ">
      {loading && (
        <div
          className="col-span-12 mt-56 flex flex-col items-center justify-center"
          style={{ color: theme.color }}
        >
          <PacmanLoader
            color={theme.color}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Carregando o card!"
            data-testid="loader"
          />
          Carregando o card!...
        </div>
      )}
      {!loading && card?.title && (
        <div className="col-span-12 mt-12 rounded-md flex flex-col items-center justify-center py-4 gap-8 ">
          {face == "frente" && (
            <div
              className=" border-2 rounded-md w-3/4 lg:w-3/6 xl:w-2/6 p-8"
              style={{ borderColor: theme.color }}
            >
              {card?.photo && (
                <>
                  <div
                    className="flex items-center justify-center  rounded-md border-2  my-8"
                    style={{ borderColor: theme.color }}
                  >
                    <Image
                      src={card?.photo}
                      alt="card photo"
                      width={44}
                      height={90}
                      className="w-full h-66 rounded-md"
                    />
                  </div>
                  <div className="flex items-center justify-center flex-wrap w-full">
                    <p
                      className="text-center  text-4xl font-bold my-12 break-words whitespace-normal break-all"
                      style={{ color: theme.color }}
                    >
                      {card?.title}
                    </p>
                  </div>
                </>
              )}
              {!card?.photo && (
                <div className="flex items-center justify-center flex-wrap w-full">
                  <p
                    className="text-center  text-2xl font-bold my-64  whitespace-normal break-all"
                    style={{ color: theme.color }}
                  >
                    {card?.title}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-center">
                <button
                  className="  p-2 border-2 rounded-md text-lg"
                  style={{ borderColor: theme.color, color: theme.color }}
                  type="button"
                  onClick={handleShowAnswer}
                >
                  Mostrar Resposta
                </button>
              </div>
            </div>
          )}
          {face == "verso" && (
            <div
              className=" border-2 rounded-md w-3/4 lg:w-3/6 xl:w-2/6 flex flex-col justify-center items-center  p-8 relative"
              style={{ borderColor: theme.color }}
            >
              <h4
                className=" break-words whitespace-normal break-all"
                style={{ color: theme.color }}
              >
                {card?.title}
              </h4>
              <hr
                className="border w-full"
                style={{ borderColor: theme.color }}
              />
              <p
                className="text-center break-words whitespace-normal break-all text-2xl font-semibold my-52"
                style={{ color: theme.color }}
              >
                {card?.answer}
              </p>
              <div
                className="flex items-center justify-between absolute bottom-4 gap-2 w-96
          px-4
          "
              >
                <div className="flex items-center justify-center flex-col gap-2 ">
                  <span
                    className="block text-lg"
                    style={{ color: theme.color }}
                  >
                    {formatTime(evalStrategy["Very Hard"])}
                  </span>
                  <button
                    className="  p-2 border-2 rounded-md text-lg"
                    style={{ borderColor: theme.color, color: theme.color }}
                    onClick={() => evaluateAnswer("Very Hard")}
                    type="button"
                  >
                    De novo
                  </button>
                </div>
                <div className="flex items-center justify-center flex-col gap-2">
                  <span
                    className="block text-lg"
                    style={{ color: theme.color }}
                  >
                    {" "}
                    {formatTime(evalStrategy["Hard"])}
                  </span>
                  <button
                    className="  p-2 border-2 rounded-md text-lg"
                    style={{ borderColor: theme.color, color: theme.color }}
                    onClick={() => evaluateAnswer("Very Hard")}
                    type="button"
                  >
                    Dificil
                  </button>
                </div>
                <div className="flex items-center justify-center flex-col gap-2">
                  <span
                    className="block text-lg"
                    style={{ color: theme.color }}
                  >
                    {formatTime(evalStrategy["Normal"])}
                  </span>
                  <button
                    className="  p-2 border-2 rounded-md text-lg"
                    style={{ borderColor: theme.color, color: theme.color }}
                    onClick={() => evaluateAnswer("Normal")}
                    type="button"
                  >
                    Bom
                  </button>
                </div>
                <div className="flex items-center justify-center flex-col gap-2">
                  <span
                    className="block text-lg"
                    style={{ color: theme.color }}
                  >
                    {formatTime(evalStrategy["Easy"])}
                  </span>
                  <button
                    className="  p-2 border-2 rounded-md text-lg"
                    style={{ borderColor: theme.color, color: theme.color }}
                    onClick={() => evaluateAnswer("Easy")}
                    type="button"
                  >
                    Facil
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {!loading && !card?.title && (
        <div className="col-span-12 flex items-center justify-center">
          <p className="my-96" style={{color:theme.color}}>
          Não há mais cards para estudar!
            </p>
        </div>
      )}
    </section>
  );
}
