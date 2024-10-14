"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import { SucessModal } from "@/app/componens/SuccessModal";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";

import JsonFormatter from "react-json-formatter";
import { useMyHeader } from "@/app/hooks/navigation";
import { BiSolidHomeHeart } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { BsValentine2 } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
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

interface Card {
  answer: string;
  photo: string;
  title: string;
  deckId: string;
  showDataTime: string;
  type: string;
  evaluation: string;
  times: number;
}

interface Deck {
  id: string;
  photo: string;
  title: string;
  cards: Card[];
}

const CREATE_CARD = gql`
  mutation CreateCard($data: CreateCardInput!) {
    createCard(data: $data) {
      id
    }
  }
`;

export default function AdicionarCartaoJson({
  params,
}: {
  params: { id: string };
}) {
  const { theme } = useTheme();

  const [sucessModalIsOpen, setSucessModalIsOpen] = useState(false);

  const [createCard, { data, loading, error }] = useMutation(CREATE_CARD);

  const [markdownText, setMarkdownText] = useState(
    `{
  "cards":[{
    "title":"",
    "answer":"",
          }]
}
    `
  );

  const handleCloseSuccessModal = () => {
    setSucessModalIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const obj = JSON.parse(markdownText);

    if (Array.isArray(obj?.cards)) {
      obj.cards.forEach(
        ({ title, answer }: { title: string; answer: string }) => {
          createCard({
            variables: {
              data: {
                title,
                answer,
                evaluation: "Very Hard",
                times: 0,
                showDataTime: new Date().toISOString(),
                deckId: params.id,
                type: "text",
                photo: "",
              },
            },
          });

          setSucessModalIsOpen(true);

          setTimeout(() => {
            handleCloseSuccessModal();
            setMarkdownText(`{
  "cards":[{
    "title":"",
    "answer":"",
          }]
}
`);
          }, 2000);
        }
      );
    }
  };

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
        name: "baralho",
        Icon: BsValentine2,
        link: `/cartoes/baralho/${params.id}`,
      },
      {
        name: "Adicionar cartão",
        Icon: IoMdAddCircle,
        link: `/cartoes/baralho/${params.id}/cartao/add`,
      },
      {
        name: "Adicionar cartão por json",
        Icon: TbJson,
        link: `/cartoes/baralho/${params.id}/cartao/add/json`,
      },
    ]);
    changeBackButton(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full pl-16 pr-16  ">
      <h3 className="text-2xl text-center mb-8" style={{ color: theme.color }}>
        Criar Cartão
      </h3>
      <form
        className="w-full border-2 rounded-lg p-8"
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
        message="Cartão criado com sucesso!"
      />
    </section>
  );
}
