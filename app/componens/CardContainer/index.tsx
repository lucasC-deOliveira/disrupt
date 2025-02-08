import Image from "next/image";
import { CardFront } from "../CardComponentFront";
import { Card } from "@/app/interfaces/Card";
import { CardBack } from "../CardComponentBack";
import { useTheme } from "@/app/hooks/useTheme";

interface CardContainerProps {
    imageSrc?: string;
    card: Card;
    handleShowAnswer: () => void;
    face: "frente" | "verso";
    evaluateAnswer: (evaluation: "Very Hard" | "Hard" | "Normal" | "Easy") => void;

}

export const CardContainer = ({ imageSrc, card, handleShowAnswer, face, evaluateAnswer }: CardContainerProps) => {
    const { theme } = useTheme();
    return (
        <div className=" flex justify-center items-start relative" style={{
            width: 370,
            height: 660,
            minHeight: 660,
            minWidth: 370,
            maxWidth: 370,
        }}>
            <div
                className={`${!imageSrc ? "border-2 bg-black opacity-95  " : ""} z-0 `}
                style={{ width: 350, height: 650, borderColor: theme.color }}
            >
                {face === "frente" && (<CardFront
                    card={card}
                    handleShowAnswer={handleShowAnswer}
                />)}
                {face == "verso" && (
                    <CardBack
                        card={card}
                        evaluateAnswer={evaluateAnswer}
                    />
                )}
            </div>

            {imageSrc && (
                <>
                    <Image
                        src={imageSrc}
                        alt="a"
                        width={500}
                        height={400}
                        className="absolute -top-10 -z-10"
                        objectFit="cover"
                        objectPosition="center"
                        style={{
                            width: 400,
                            height: 700,
                            minHeight: 700,
                            minWidth: 400,
                            maxWidth: 400,
                            backgroundSize: "cover",
                        }}
                    />
                    <div style={{
                        width: 360, height: 645,
                        minHeight: 645,
                        minWidth: 360,
                        maxWidth: 360,
                    }}
                        className="absolute  -z-20 bg-black"></div>
                </>
            )}


        </div>
    )
} 