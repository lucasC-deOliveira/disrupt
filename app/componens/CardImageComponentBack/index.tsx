import { useTheme } from "@/app/hooks/useTheme";
import { Card } from "@/app/interfaces/Card";
import { Textfit } from "react-textfit";
import { AnswerCardComponent } from "../AnswerCardComponent";

export function CardImageBack(
    { card,
        evaluateAnswer }: {
            card: Card;
            evaluateAnswer: (evaluation: "Very Hard" | "Hard" | "Normal" | "Easy") => void;
        }
) {

    const { theme } = useTheme();

    return (
        <div
            className="rounded-md w-3/4 lg:w-3/6 xl:w-2/6 flex flex-col p-4 items-center "
            style={{
                borderColor: theme.color,
                width: 350,
                height: 630,
                minHeight: 630,
                minWidth: 350,
                maxWidth: 350,
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

            <div className="w-full flex items-center justify-center mt-8">
                <AnswerCardComponent card={card} evaluateAnswer={evaluateAnswer} />

            </div>
        </div>
    )
}