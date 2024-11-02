"use client";
import { useTheme } from "../../hooks/useTheme";
import { useState } from "react";
import JsonFormatter from "react-json-formatter";
import { TextAreaDefault } from "@/app/componens/TextAreaDefault";
export default function Home() {
  const { theme } = useTheme();

  const [text, setText] = useState("");

  const [words, setWords] = useState<{ name: string; frequency: number }[]>([]);

  const [selectedWords, setSelectedWords] = useState<string[]>([])

  const jsonStyle = {
    propertyStyle: { color: theme.color },
    stringStyle: { color: theme.color },
    numberStyle: { color: theme.color },
  };

  const changeSelectedWords = (selected:string) => {
    if (selectedWords.includes(selected)) {
        // Se a palavra já está selecionada, removê-la do array
        setSelectedWords(selectedWords.filter(word => word !== selected));
      } else {
        // Caso contrário, adicionar a palavra ao array
        setSelectedWords([...selectedWords, selected]);
      }
  }


  const handleTextChange = (text: string) => {
    setText(text);
  };

  const countWordsFrequency = (text: string) => {
    // 1. Remover pontuação e converter para minúsculas
    const cleanedText = text
      .replace(/[.,?!;()"'-]/g, "") // Remove pontuação
      .toLowerCase();

    // 2. Dividir o texto em palavras
    const words = cleanedText.split(/\s+/); // Divide por espaços ou quebras de linha


    // 3. Criar um objeto para armazenar a frequência das palavras
    const wordFrequency: any = {};

    words.forEach((word) => {
      if (wordFrequency[word]) {
        wordFrequency[word] += 1; // Se a palavra já existir, incrementar
      } else {
        wordFrequency[word] = 1; // Se for a primeira vez, inicializar como 1
      }
    });

    // 4. Retornar a frequência das palavras e o número total de palavras
    // @ts-ignore
    return [...new Set(words)].map((word) => {
      return {
        name: word,
        frequency: wordFrequency[word],
      };
    });
    //   totalWords: words.length,
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setWords(countWordsFrequency(text));
  };
  return (
    <section className="  w-full px-40 relative">
      <h1
        className="text-center text-lg font-bold my-4"
        style={{ color: theme.color }}
      >
        Contador de frequência de palavras
      </h1>
      <form className="w-full  bg-black opacity-95" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextAreaDefault
            name="Qual texto deseja contar a frequência de palavras? insira aqui!"
            height="12"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            color={theme.color}
          />
        </div>
        <button
          className="absolute right-48 mt-2 border-2 rounded-md px-4 py-2  bg-black opacity-95"
          style={{ borderColor: theme.color, color: theme.color }}
        >
          Contar
        </button>
      </form>
      <div className=" w-full min-h-40 my-32 rounded-md">
        <table
          className="min-w-full table-auto border-collapse  border-solid border-2  rounded-md  bg-black opacity-95"
          style={{ borderColor: theme.color, color: theme.color }}
        >
          <caption className="text-lg font-semibold my-4">
            Tabela de palavras
          </caption>
          <thead>
            <tr>
              <th
                className=" rounded-md px-4 py-2 w-1/12"
              >
                Selecionar
              </th>
              <th
                className="rounded-md px-4 py-2 w-1/12"
              >
                Nº
              </th>
              <th
                className="  rounded-md px-4 py-2 w-1/12"
              >
                Frequência
              </th>
              <th
                className="  rounded-md px-4 py-2 w-9/12"
              >
                Palavra
              </th>
            </tr>
          </thead>
          <tbody>
            {words.map((word, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-900 ${index % 2 === 0 ? "bg-zinc-900": "bg-transparent" }`}
              >
                <td className=" px-4 py-2 text-center ">
                  <input
                    type="checkbox"
                    className="appearance-none border w-4 h-4 rounded-sm bg-transparent checked:bg-blue-500 "
                    style={{ borderColor: theme.color, color: theme.color }}
                    onChange={() => changeSelectedWords(word.name)}
                  />
                </td>
                <td className=" px-4 py-2 text-center ">
                  <span className="text-md"> {index + 1}</span>
                </td>

                <td className=" px-4 py-2 text-center">{word.frequency}</td>

                <td className=" px-4 py-2 text-center">{word.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 ">
     
        <h3 style={{color:theme.color}}>Palavras:</h3>
          <div className="p-4 rounded-md  bg-black opacity-95">
            <JsonFormatter
              json={`{"words": "[${selectedWords}]"}`}
              tabWith={4}
              jsonStyle={jsonStyle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
