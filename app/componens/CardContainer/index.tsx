import Image from "next/image";
import { CardTextFront } from "../CardTextComponentFront";
import { Card } from "@/app/interfaces/Card";
import { CardTextBack } from "../CardTextComponentBack";
import { useTheme } from "@/app/hooks/useTheme";
import CardComponentVideo from "../CardComponentVideo";
import { CardImageFront } from "../CardImageComponentFront";
import { CardImageBack } from "../CardImageComponentBack";

interface CardContainerProps {
    imageSrc?: string;
    card: Card;
    handleShowAnswer: () => void;
    face: "frente" | "verso";
    evaluateAnswer: (evaluation: "Very Hard" | "Hard" | "Normal" | "Easy") => void;
    type: "video" | "image" | "text";

}

export const CardContainer = ({ imageSrc, card, handleShowAnswer, face, evaluateAnswer, type }: CardContainerProps) => {
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
                {type === "video" && (
                    <CardComponentVideo card={card} evaluateAnswer={evaluateAnswer} />
                )}
                {type === "image" && (
                    <>
                        {face === "frente" && (
                            <CardImageFront
                                card={card}
                                handleShowAnswer={handleShowAnswer}
                            />
                        )}
                        {face === "verso" && (
                            <CardImageBack
                                card={card}
                                evaluateAnswer={evaluateAnswer}
                            />
                        )}
                    </>
                )}

                {type === "text" && (
                    <>
                        {face === "frente" && (
                            <CardTextFront
                                card={card}
                                handleShowAnswer={handleShowAnswer}
                            />
                        )}
                        {face === "verso" && (
                            <CardTextBack
                                card={card}
                                evaluateAnswer={evaluateAnswer}
                            />
                        )}
                    </>
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