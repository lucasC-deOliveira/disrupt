import { useTheme } from "@/app/hooks/useTheme";
import { Card } from "@/app/interfaces/Card";
import { answerCardEvaluationTimeStrategy } from "@/app/utils/AnswerCardEvaluationTimeStrategy";
import { formatTime } from "@/app/utils/FormateTime";

interface AnswerCardComponentProps {
    evaluateAnswer: (evaluation: "Very Hard" | "Hard" | "Normal" | "Easy") => void;
    card : Card;
}

export const AnswerCardComponent = ({  evaluateAnswer, card }: AnswerCardComponentProps) => {
    const { theme } = useTheme(); 

    return (
        <div
        className="flex items-center justify-center gap-4 w-full"
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
                className="block text-xs"
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
                className="block text-xs"
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
                className="block text-xs"
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
                className="block text-xs"
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
    )
}