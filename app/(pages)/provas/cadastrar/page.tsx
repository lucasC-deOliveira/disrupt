"use client";
import { InputDefault } from "@/app/componens/InputDefault";
import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

interface QuestionType {
  type: "Mult" | "C/E";
}

interface Choice {
  content: string;
  isAnswer: boolean;
}

interface Question {
  statement: string;
  type: QuestionType["type"];
  choises: Choice[];
  complement: { type: string; content: any; order: number }[];
}

interface Exam {
  photo?: string;
  name: string;
  description: string;
  questions: Question[];
}

export default function CadastrarProva() {
  const { theme } = useTheme();

  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("Cadastro de prova");

  const [questions, setQuestion] = useState<Question[]>([]);

  const [choices, setChoices] = useState<Choice[]>([]);

  const [questionType, setQuestionType] = useState<QuestionType>({
    type: "Mult",
  });

  const handleChageQuestionType = (questionType: QuestionType) => {
    setQuestionType(questionType);
  };

  const handleChageTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleNextStep = () => {
    setStep((oldStep) => {
      if (oldStep < 3) {
        return oldStep + 1;
      }
      return oldStep;
    });
  };

  const handleBackStep = () => {
    setStep((oldStep) => {
      if (oldStep > 1) {
        return oldStep - 1;
      }
      return oldStep;
    });
  };

  useEffect(() => {
    if (step == 1) {
      setTitle("Cadastro de prova");
    }
    if (step == 2) {
      setTitle("Cadastro de Prova / Inserir questão");
    }
  }, [step]);

  return (
    <section className="w-full p-16">
      <div
        className="border-2 px-8 py-4 rounded-md"
        style={{ borderColor: theme.color }}
      >
        <div className="w-full flex items-center justify-center mb-4">
          <div className="flex gap-2">
            <div
              className="w-4 h-4 rounded-full border-2"
              style={{
                backgroundColor: step === 1 ? theme.color : "black",
                borderColor: theme.color,
              }}
            ></div>

            <div
              className="w-4 h-4 rounded-full border-2"
              style={{
                borderColor: theme.color,
                backgroundColor: step === 2 ? theme.color : "black",
              }}
            ></div>
            <div
              className="w-4 h-4 rounded-full border-2"
              style={{
                borderColor: theme.color,
                backgroundColor: step === 3 ? theme.color : "black",
              }}
            ></div>
          </div>
        </div>

        <h1
          className="font-bold text-center mb-8 "
          style={{ color: theme.color }}
        >
          {title}
        </h1>
        {step === 1 && (
          <>
            <div className="flex gap-4">
              <div className="w-1/2 flex flex-col gap-8 items-center justify-center">
                <div
                  className="w-72 border-2 h-72 rounded-md flex justify-center items-center"
                  style={{ borderColor: theme.color }}
                >
                  <span style={{ color: theme.color }}> Foto </span>
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-8">
                <InputDefault name="Nome da prova" height="3" />
                <InputDefault name="descricão" height="12" />
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-8">
              {step < 3 && step > 0 && (
                <button
                  onClick={handleNextStep}
                  className=" w-32 rounded-md text-lg font-bold p-2"
                  style={{ background: theme.color, color: theme.background }}
                >
                  Proximo
                </button>
              )}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="">
              <InputDefault name="Enunciado" height="5" />
              <div className="flex gap-4">
                <button className="my-4 flex gap-2 items-center">
                  <IoAddCircleOutline
                    className="w-8 h-8"
                    style={{ fill: theme.color, color: theme.color }}
                  />
                  <span style={{ color: theme.color }}>Adicionar Foto </span>
                </button>
                <button className="my-4 flex gap-2 items-center">
                  <IoAddCircleOutline
                    className="w-8 h-8"
                    style={{ fill: theme.color, color: theme.color }}
                  />
                  <span style={{ color: theme.color }}>
                    Adicionar Texto complementar{" "}
                  </span>
                </button>
              </div>
              <h4 style={{ color: theme.color }}>
                Alternativas /{" "}
                <select
                  className="bg-transparent backdrop:filter-none"
                  onChange={(e) => {
                    if (e.target.value === "Mult" || e.target.value === "C/E") {
                      handleChageQuestionType({ type: e.target.value });
                    }
                  }}
                >
                  <option value={"Mult"}> Multipla escolha</option>
                  <option value={"C/E"}>Certo Errado</option>
                </select>
              </h4>
              {questionType.type === "Mult" && (
                <div className="my-4 w-full flex flex-col gap-4">
                  <div className="" style={{ color: theme.color }}>
                    <button
                      className="w-8 h-8 border-2 rounded-full mr-4 font-bold"
                      style={{
                        borderColor: theme.color,
                        backgroundColor: theme.color,
                        color: theme.background,
                      }}
                    >
                      A
                    </button>
                    <input
                      className="w-1/4 border-2 rounded-md bg-transparent  "
                      style={{ borderColor: theme.color }}
                    />
                  </div>
                  <div className="" style={{ color: theme.color }}>
                    <button
                      className="w-8 h-8 border-2 rounded-full mr-4 font-bold"
                      style={{ borderColor: theme.color }}
                    >
                      B
                    </button>
                    <input
                      className="w-1/4 border-2 rounded-md bg-transparent  "
                      style={{ borderColor: theme.color }}
                    />
                  </div>
                  <div className="" style={{ color: theme.color }}>
                    <button
                      className="w-8 h-8 border-2 rounded-full mr-4 font-bold"
                      style={{ borderColor: theme.color }}
                    >
                      C
                    </button>
                    <input
                      className="w-1/4 border-2 rounded-md bg-transparent  "
                      style={{ borderColor: theme.color }}
                    />
                  </div>
                  <div className="" style={{ color: theme.color }}>
                    <button
                      className="w-8 h-8 border-2 rounded-full mr-4 font-bold"
                      style={{ borderColor: theme.color }}
                    >
                      D
                    </button>
                    <input
                      className="w-1/4 border-2 rounded-md bg-transparent  "
                      style={{ borderColor: theme.color }}
                    />
                  </div>
                  <div className="" style={{ color: theme.color }}>
                    <button
                      className="w-8 h-8 border-2 rounded-full mr-4 font-bold"
                      style={{ borderColor: theme.color }}
                    >
                      E
                    </button>
                    <input
                      className="w-1/4 border-2 rounded-md bg-transparent  "
                      style={{ borderColor: theme.color }}
                    />
                  </div>
                </div>
              )}
              {questionType.type === "C/E" && (
                <div className="my-4 w-full flex flex-col gap-4">
                  <div className="" style={{ color: theme.color }}>
                    <button
                      className="w-8 h-8 border-2 rounded-full mr-4 font-bold"
                      style={{
                        borderColor: theme.color,
                        backgroundColor: theme.color,
                        color: theme.background,
                      }}
                    >
                      C
                    </button>
                    <input
                      className="w-1/4 border-2 rounded-md bg-transparent  "
                      style={{ borderColor: theme.color }}
                    />
                  </div>
                  <div className="" style={{ color: theme.color }}>
                    <button
                      className="w-8 h-8 border-2 rounded-full mr-4 font-bold"
                      style={{ borderColor: theme.color }}
                    >
                      E
                    </button>
                    <input
                      className="w-1/4 border-2 rounded-md bg-transparent  "
                      style={{ borderColor: theme.color }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="w-full flex items-center gap-8 justify-center mt-8">
              {step > 1 && (
                <button
                  onClick={handleBackStep}
                  className="border-2 w-32 rounded-md text-lg p-2"
                  style={{ borderColor: theme.color, color: theme.color }}
                >
                  Voltar
                </button>
              )}
              {step < 3 && step > 0 && (
                <button
                  onClick={handleNextStep}
                  className=" w-32 rounded-md text-lg font-bold p-2"
                  style={{ background: theme.color, color: theme.background }}
                >
                  Proximo
                </button>
              )}
            </div>
          </>
        )}
        {/* {step === 2 && (
            <div className="flex gap-4">
                <div className="w-1/2 flex flex-col gap-8 ">

                </div>
            <div/>
        )} */}
      </div>
    </section>
  );
}
