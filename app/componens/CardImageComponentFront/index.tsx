import { useTheme } from "@/app/hooks/useTheme";
import { Card } from "@/app/interfaces/Card";
import Image from "next/image";
import { Textfit } from 'react-textfit';

export function CardImageFront({
    card,
    handleShowAnswer,
}: {
    card: Card;
    handleShowAnswer: () => void;
}) {
    const { theme } = useTheme();

    return (
        <div
            className="rounded-md w-3/4 lg:w-3/6 xl:w-2/6 p-8 flex flex-col items-center  mt-2 z-0 "
            style={{
                borderColor: theme.color,
                width: 350,
                height: 630,
                minHeight: 630,
                minWidth: 350,
                maxWidth: 350,
            }}
        >
            {card?.photo && (
                <>
                    <div
                        className="flex items-center justify-center  rounded-md border-2  my-8 "
                        style={{
                            borderColor: theme.color,
                            width: 300,
                            height: 300,
                            minHeight: 300,
                            minWidth: 300,
                            maxWidth: 300,
                        }}
                    >
                        <Image
                            src={card?.photo}
                            alt="card photo"
                            width={44}
                            height={90}
                            className="w-full h-full rounded-md"
                        />
                    </div>
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
                </>
            )}
            <div className="flex items-center justify-center mt-16 z-0">
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