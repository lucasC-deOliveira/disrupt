import { useTheme } from "@/app/hooks/useTheme";
import { Card } from "@/app/interfaces/Card";
import Image from "next/image";
import { Textfit } from 'react-textfit';

export function CardTextFront({
    card,
    handleShowAnswer,
}: {
    card: Card;
    handleShowAnswer: () => void;
}) {
    const { theme } = useTheme();

    return (
        <div
            className="rounded-md w-3/4 lg:w-3/6 xl:w-2/6 p-8   mt-2 z-0 "
            style={{
                borderColor: theme.color,
                width: 340,
                height: 630,
                minHeight: 630,
                minWidth: 340,
                maxWidth: 340,
            }}
        >

            <div className="flex justify-center items-center w-full z-0  overflow-hidden "
                style={{
                    width: 280,
                    height: 480,
                    minHeight: 480,
                    minWidth: 280,
                    maxWidth: 280,
                }}>

                <Textfit
                    mode="multi"
                    forceSingleModeWidth={false}
                    max={40}  // tamanho máximo da fonte desejado
                    min={6}
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

            <div className="flex items-center justify-center mt-8 z-0">
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
    )
}