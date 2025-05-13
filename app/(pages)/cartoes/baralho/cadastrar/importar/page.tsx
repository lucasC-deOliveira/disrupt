"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { use, useEffect, useState } from "react";
import { SucessModal } from "@/app/componens/SuccessModal";
import { gql, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";

import JsonFormatter from "react-json-formatter";
import { useMyHeader } from "@/app/hooks/navigation";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { TbJson } from "react-icons/tb";

const AceEditor = dynamic(
    async () => {
        const ace = await import("react-ace");
        await import("ace-builds/src-noconflict/theme-monokai");
        await import("ace-builds/src-noconflict/mode-json");
        await import("ace-builds/src-noconflict/ext-language_tools");
        return ace;
    },
    { ssr: false }
);

interface DeckInput {
    title: string;
    photo: string;
    id: string;
    cards: CardInput[];
}
interface CardInput {
    answer: string;
    title: string;
    showDataTime: string;
    evaluation: string;
    times: number;
    id: string;
}

export const IMPORT_DECK = gql`
  mutation ImportDeck($data: SyncInput!) {
    importDecks(data: $data) {
      status,
      message,
      
    }
  }
`;

export default function ImportarBaralhoJson() {
    const { theme } = useTheme();


    const [sucessModalIsOpen, setSucessModalIsOpen] = useState(false);

    const [importDeck, { data, loading, error }] = useMutation(IMPORT_DECK);

    const jsonShape = `{"decks":[{
    "title": "Privacy and Data Protection",
    "photo": "fafdafds",
    "id": "00b2183b-f0a4-47d6-bc35-75b69857e45d",
    "cards": [
      {
        "answer": "Principais características incluem: proteção à privacidade individual, exigência de consentimento informado, transparência sobre o uso dos dados, direito de acesso, correção e exclusão, obrigações de segurança da informação para controladores e operadores, e previsão de sanções em caso de descumprimento.",
        "title": "Leis de proteção de dados - Características",
        "showDataTime": "2025-04-08T22:11:16.456Z",
        "evaluation": "Very Hard",
        "times": 0,
        "id": "d6635dd3-0df3-49bf-a32c-d70de5ada7d1"
      }
      
    ]
  }]
    }
    `

    const [markdownText, setMarkdownText] = useState(jsonShape)


    const handleCloseSuccessModal = () => {
        setSucessModalIsOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const obj = JSON.parse(markdownText);

        if (Array.isArray(obj?.decks)) {
            for(let deck of obj.decks) {
                for(let card of deck.cards){
                    card.type = "text",
                    card.deckId = deck.id
                }
            }
            importDeck({
                variables: {
                    data: {
                        decks: obj.decks
                    },
                },
            });

            setSucessModalIsOpen(true);

            setTimeout(() => {
                handleCloseSuccessModal();
                setMarkdownText(jsonShape);
            }, 2000);
        }

    }

    const jsonStyle = {
        propertyStyle: { color: theme.color },
        stringStyle: { color: "white" },
        numberStyle: { color: theme.color },
    };

    const { changePaths, changeTitle, changeBackButton } = useMyHeader();

    useEffect(() => {
        changeTitle("Cartões");
        changePaths([
            {
                name: "Home",
                Icon: BiSolidHomeHeart,
                link: "/cartoes",
            },
            {
                name: "Cartões",
                Icon: AiFillCreditCard,
                link: "/cartoes",
            },
            {
                name: "Baralhos",
                Icon: MdLibraryBooks,
                link: "/cartoes",
            },

            {
                name: "Importar baralho json",
                Icon: TbJson,
                link: `/cartoes/baralho/cadastra/importar`,
            },
        ]);
        changeBackButton(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="w-full pl-16 pr-16  ">
            <h3 className="text-2xl text-center mb-8" style={{ color: theme.color }}>
                Importar baralhos
            </h3>
            <form
                className="w-full border-2 rounded-lg p-8 bg-black opacity-95"
                style={{ borderColor: theme.color, color: theme.color }}
                method="Post"
                onSubmit={handleSubmit}
            >
                <div className="rouded-md">
                    <AceEditor
                        mode="json"
                        theme="monokai"
                        name="markdown-editor"
                        editorProps={{ $blockScrolling: true }}
                        fontSize={14}
                        width="100%"
                        height="400px"
                        value={markdownText}
                        onChange={(value) => setMarkdownText(value)}
                        showPrintMargin={false}
                        showGutter={true}
                        highlightActiveLine={true}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                        className="rounded-md"
                    />
                </div>
                <div>
                    <h3>Pré-visualização:</h3>
                    <div className="p-4 rounded-md bg-gray-800">
                        <JsonFormatter
                            json={markdownText}
                            tabWith={4}
                            jsonStyle={jsonStyle}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center items-center mt-4">
                    <button
                        className="border-2 rounded-md p-4 w-32 mb-6"
                        style={{ borderColor: theme.color, color: theme.color }}
                        type="submit"
                    >
                        Criar
                    </button>
                </div>
            </form>
            <SucessModal
                closeModal={handleCloseSuccessModal}
                isOpen={sucessModalIsOpen}
                message="Baralhos importados com sucesso!"
            />
        </section>
    );
}
