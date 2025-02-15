import { useTheme } from "@/app/hooks/useTheme";
import { Card } from "@/app/interfaces/Card";
import { Textfit } from "react-textfit";
import ReactPlayer from 'react-player'
import { AnswerCardComponent } from "../AnswerCardComponent";


interface CardComponentVideoProps { card: Card; evaluateAnswer: (evaluation: "Very Hard" | "Hard" | "Normal" | "Easy") => void; }

export default function CardComponentVideo({ card, evaluateAnswer }: CardComponentVideoProps) {
    const { theme } = useTheme();
    return (
        <div
            className="rounded-md w-3/4 lg:w-3/6 xl:w-2/6 p-8 flex flex-col items-center mt-2 z-0  "
            style={{
                borderColor: theme.color,
                width: 350,
                height: 630,
                minHeight: 630,
                minWidth: 350,
                maxWidth: 350,
            }}
        >
            <div className="flex items-center justify-center flex-wrap w-full overflow-hidden ">
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
            <div
                className="flex items-center justify-center  w-full rounded-md border-2  mt-8 overflow-hidden"
                style={{
                    borderColor: theme.color,
                    height: 450,
                }}
            >
                <ReactPlayer
                    url={card?.video}
                    width='100%'
                    height='100%'
                    playing={true}
                    controls={true}
                    loop={true}
                />

            </div>
            <div className="w-full flex items-center justify-center mt-8">
                <AnswerCardComponent card={card} evaluateAnswer={evaluateAnswer} />

            </div>

        </div>
    );
}