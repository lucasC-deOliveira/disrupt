"use client";

import { useTheme } from "@/app/hooks/useTheme";
import Image from "next/image";
import girl from "@/public/images/girl.png";
import { useState } from "react";

export default function EstudarBaralho() {
  const { theme } = useTheme();
  const [face, setFace] = useState<'frente'|'verso'>('frente')
  
  const handleShowAnswer = () => {
    setFace('verso')
  }

  const evaluateAnswer = (evaluation:'Very Hard' | 'Hard' | 'Nomal' | "Easy") => {
    console.log(evaluation)
  }

  return (
    <section className="w-full pl-16 pr-16 ">
      <div className="w-full  rounded-md flex flex-col items-center justify-center py-16  px-96 gap-8 ">
        {face =='frente' && (<div
          className=" border-2 rounded-md w-full p-8"
          style={{ borderColor: theme.color, height:778+'px' }}
        >
          <div
            className="flex items-center justify-center  rounded-md border-2  my-8"
            style={{ borderColor: theme.color }}
          >
            <Image
              src={girl.src}
              alt="girl"
              width={44}
              height={90}
              className="w-full h-66 rounded-md"
            />
          </div>
          <h2
            className="text-center text-4xl font-bold my-12"
            style={{ color: theme.color }}
          >
            Menina
          </h2>
          <div className="flex items-center justify-center">
            <button
              className="  p-4 border-2 rounded-md text-2xl"
              style={{ borderColor: theme.color, color: theme.color }}
              type="button"
              onClick={handleShowAnswer}
            >
              Mostrar Resposta
            </button>
          </div>
        </div>)}
        {face =='verso' && (<div
          className=" border-2 rounded-md w-full flex flex-col justify-center items-center  p-8 relative"
          style={{ borderColor: theme.color, height:778+'px' }}
        >
          
          <h2
            className="text-center text-4xl font-semibold"
            style={{ color: theme.color }}
          >
            é um humano do sexo femenino filhote 
          </h2>
          <div className="flex items-center justify-between absolute bottom-4 gap-4
          mb-8
          ">
            <div className="flex items-center justify-center flex-col gap-2 ">
            <span className="block text-2xl" style={{color:theme.color}}> 1 min</span>
            <button
              className="  p-4 border-2 rounded-md text-2xl"
              style={{ borderColor: theme.color, color: theme.color }}
              onClick={()=>evaluateAnswer("Very Hard")}
              type="button"
            >
              De novo
            </button>
            </div>
            <div className="flex items-center justify-center flex-col gap-2">
            <span className="block text-2xl" style={{color:theme.color}}> 1 min</span>
            <button
              className="  p-4 border-2 rounded-md text-2xl"
              style={{ borderColor: theme.color, color: theme.color }}
              onClick={()=>evaluateAnswer("Hard")}
              type="button"
            >
              Dificil
            </button>
            </div>
            <div className="flex items-center justify-center flex-col gap-2">
            <span className="block text-2xl" style={{color:theme.color}}> 1 min</span>
            <button
              className="  p-4 border-2 rounded-md text-2xl"
              style={{ borderColor: theme.color, color: theme.color }}
              onClick={()=>evaluateAnswer("Nomal")}
              type="button"
            >
              Bom
            </button>
            </div>
            <div className="flex items-center justify-center flex-col gap-2">
            <span className="block text-2xl" style={{color:theme.color}}> 1 min</span>
            <button
              className="  p-4 border-2 rounded-md text-2xl"
              style={{ borderColor: theme.color, color: theme.color }}
              onClick={()=>evaluateAnswer("Easy")}
              type="button"
            >
              Facio
            </button>
            </div>
          </div>
        </div>)}
      </div>
    </section>
  );
}
