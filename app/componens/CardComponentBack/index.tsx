import { useTheme } from "@/app/hooks/useTheme";
import { Card } from "@/app/interfaces/Card";
import { answerCardEvaluationTimeStrategy } from "@/app/utils/AnswerCardEvaluationTimeStrategy";
import { formatTime } from "@/app/utils/FormateTime";
import { Textfit } from "react-textfit";

export function CardBack(
    { card,
        evaluateAnswer }: {
            card: Card;
            evaluateAnswer: (evaluation: "Very Hard" | "Hard" | "Normal" | "Easy") => void;
        }
) {

    const { theme } = useTheme();

    return (
        <div
            className="rounded-md w-3/4 lg:w-3/6 xl:w-2/6 flex flex-col items-center  p-4 relative"
            style={{
                borderColor: theme.color,
                width: 340,
                height: 630,
                minHeight: 630,
                minWidth: 340,
                maxWidth: 340,
            }}
        >
            <div className="flex items-center justify-center flex-wrap w-full overflow-hidden " style={{
                width: 300,
                height: 50,
                minHeight: 50,
                minWidth: 300,
                maxWidth: 300,
            }}>

                <Textfit
                    mode="multi"
                    forceSingleModeWidth={false}
                    max={40}  // tamanho máximo da fonte desejado
                    style={{
                        color: theme.color, whiteSpace: "normal",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                    }}
                    className="text-center font-bold"
                >
                    {card?.title}
                </Textfit>
            </div>
            <hr
                className="border w-full"
                style={{ borderColor: theme.color }}
            />
            <div className="flex justify-center items-center mt-8 flex-wrap w-full overflow-hidden  " style={{
                borderColor: theme.color,
                width: 300,
                height: 400,
                minHeight: 400,
                minWidth: 300,
                maxWidth: 300,
            }}>
                <Textfit
                    mode="multi"
                    forceSingleModeWidth={false}
                    max={40}  // tamanho máximo da fonte desejado
                    style={{
                        color: theme.color, whiteSpace: "normal",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                    }}
                    className="text-center font-bold"
                >
                    {card?.answer}
                </Textfit>
            </div>

            <div
                className="flex items-center justify-center absolute bottom-8 gap-4 w-full
                  px-4
                  "
                style={{
                    borderColor: theme.color,
                    width: 300,
                    height: 80,
                    minHeight: 80,
                    minWidth: 300,
                    maxWidth: 300,
                }}
            >
                <div className="flex items-center justify-center flex-col  ">
                    <span
                        className="block text-sm"
                        style={{ color: theme.color }}
                    >
                        {formatTime(answerCardEvaluationTimeStrategy(card.evaluation == "Very Hard" ? card.times : 1, "Very Hard"))}
                    </span>
                    <button
                        className="  p-2 border-2 w-16 h-16 rounded-md  text-sm"
                        style={{ borderColor: theme.color, color: theme.color }}
                        onClick={() => evaluateAnswer("Very Hard")}
                        type="button"
                    >

                        De novo

                    </button>
                </div>
                <div className="flex items-center justify-center flex-col">
                    <span
                        className="block text-sm"
                        style={{ color: theme.color }}
                    >
                        {" "}
                        {formatTime(answerCardEvaluationTimeStrategy(card.evaluation == "Hard" ? card.times : 1, "Hard"))}               </span>
                    <button
                        className=" w-16 h-16 p-2 border-2 rounded-md text-sm"
                        style={{ borderColor: theme.color, color: theme.color }}
                        onClick={() => evaluateAnswer("Very Hard")}
                        type="button"
                    >


                        Dificil

                    </button>
                </div>
                <div className="flex items-center justify-center flex-col">
                    <span
                        className="block text-sm"
                        style={{ color: theme.color }}
                    >
                        {formatTime(answerCardEvaluationTimeStrategy(card.evaluation == "Normal" ? card.times : 1, "Normal"))}             </span>
                    <button
                        className=" w-16 h-16 p-2 border-2 rounded-md text-sm"
                        style={{ borderColor: theme.color, color: theme.color }}
                        onClick={() => evaluateAnswer("Normal")}
                        type="button"
                    >


                        Bom

                    </button>
                </div>
                <div className="flex items-center justify-center flex-col ">
                    <span
                        className="block text-sm"
                        style={{ color: theme.color }}
                    >
                        {formatTime(answerCardEvaluationTimeStrategy(card.evaluation == "Easy" ? card.times : 1, "Easy"))}             </span>
                    <button
                        className=" w-16 h-16 p-2 border-2 rounded-md text-sm"
                        style={{ borderColor: theme.color, color: theme.color }}
                        onClick={() => evaluateAnswer("Easy")}
                        type="button"
                    >


                        Facil

                    </button>
                </div>
            </div>
        </div>
    )
}