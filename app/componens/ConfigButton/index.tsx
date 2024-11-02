"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import lolCardPurple from "../../../public/images/lolCardFramePurple.png";
import lolCardBlue from "../../../public/images/lolCardFrameBlue.png";
import lolCardRed from "../../../public/images/lolCardFrameRed.png";
import lolCardDarkBlue from "../../../public/images/lolCardFrameDarkBlue.png";
import lolCardGold from "../../../public/images/lolCardFrameGold.png";
import lolCardSilver from "../../../public/images/lolCardFrameSilver.png";

export const ConfigButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [animationKeyframes, setAnimationKeyframes] = useState(0);

  const { theme, handleSetTheme } = useTheme();

  const handleOpenButton = () => {
    setIsOpen(true);
  };

  const handleCloseButton = () => {
    setIsOpen(false);
  };
  const setColor = (color: string) => {
    handleSetTheme({
      color,
      background: theme.background,
      cardFrame: theme.cardFrame,
    });
  };

  const setBgColor = (color: string) => {
    handleSetTheme({
      color: theme.color,
      background: color,
      cardFrame: theme.cardFrame,
    });
  };

  const setCardFrame = (option: string) => {
    handleSetTheme({
      color: theme.color,
      background: theme.background,
      cardFrame: option,
    });
  };

  useEffect(() => {
    const styleSheet = document.styleSheets[0];

    // Remove a regra anterior, se existir
    if (animationKeyframes) {
      styleSheet.deleteRule(animationKeyframes);
    }

    // Adiciona novos keyframes para pulsação do neon
    const ruleIndex = styleSheet.insertRule(`
      @keyframes pulseNeon {
        0%, 100% {
          box-shadow: 0 0 10px ${theme.color}, 0 0 20px ${theme.color}, 0 0 35px ${theme.color}, 0 0 40px ${theme.color};
        }
        50% {
          box-shadow: 0 0 20px ${theme.color}, 0 0 30px ${theme.color}, 0 0 55px ${theme.color}, 0 0 60px ${theme.color};
        }
      }
    `);

    // Atualiza o estado com o índice da regra de keyframes para futura remoção
    setAnimationKeyframes(ruleIndex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ theme.color]);

  if (!isOpen) {
    return (
      <button
        className="w-8 h-8  border-2 rounded-md items-center justify-center flex bg-black shadow-2xl"
        style={{ borderColor: theme.color }}
        onClick={() => handleOpenButton()}
      >
        <AiFillSetting
          className="w-6 h-6 animate-spin "
          style={{ fill: theme.color }}
        />
      </button>
    );
  } else {
    return (
      <div
        className={` end-0 z-10 mt-2  w-80 rounded-md border-2 bg-black shadow-lg relative`}
        style={{ borderColor: theme.color, height: 550 }}
        role="menu"
      >
        <h3
          className="text-sm text-center mt-2 font-bold"
          style={{ color: theme.color }}
        >
          Tema
        </h3>
        <hr style={{ borderColor: theme.color }} />
        <button
          className="absolute top-2 right-2"
          onClick={() => handleCloseButton()}
        >
          <IoClose style={{ fill: theme.color }} />
        </button>
        <h3 className="text-sm mt-2 ml-4" style={{ color: theme.color }}>
          Cor principal:{" "}
        </h3>
        <div className="p-4 grid grid-cols-4 gap-4">
          <button
            className="w-4 h-4 bg-cyan-500 "
            style={{ backgroundColor: "rgb(88,125,160)" }}
            type="button"
            onClick={() => setColor("rgb(88,125,160)")}
          />
          <button
            className="w-4 h-4"
            type="button"
            style={{ backgroundColor: "rgb(251,159,252)" }}
            onClick={() => setColor("rgb(251,159,252)")}
          />
          <button
            className="w-4 h-4"
            type="button"
            style={{ backgroundColor: "rgb(173,235,255)" }}
            onClick={() => setColor("rgb(173,235,255)")}
          />
          <button
            className="w-4 h-4"
            type="button"
            style={{ backgroundColor: "rgb(200,68,82)" }}
            onClick={() => setColor("rgb(200,68,82)")}
          />
          <button
            className="w-4 h-4"
            type="button"
            style={{ backgroundColor: "rgb(228,212,113)" }}
            onClick={() => setColor("rgb(228,212,113)")}
          />
          <button
            className="w-4 h-4"
            type="button"
            style={{ backgroundColor: "rgb(186,198,194)" }}
            onClick={() => setColor("rgb(186,198,194)")}
          />
          <button
            className="w-4 h-4 bg-cyan-500 "
            type="button"
            onClick={() => setColor("rgb(6 182 212)")}
          />
          <button
            className="w-4 h-4 bg-purple-500 "
            type="button"
            onClick={() => setColor("rgb(168 85 247)")}
          />
          <button
            className="w-4 h-4 bg-lime-500 "
            type="button"
            onClick={() => setColor("rgb(132 204 22)")}
          />
          <button
            className="w-4 h-4 bg-red-600 "
            type="button"
            onClick={() => setColor("rgb(239 68 68)")}
          />
          <button
            className="w-4 h-4 bg-white "
            type="button"
            onClick={() => setColor("#fff")}
          />
          <button
            className="w-4 h-4 bg-green-500 "
            type="button"
            onClick={() => setColor("rgb(34 197 94)")}
          />
          <button
            className="w-4 h-4 bg-orange-500 "
            type="button"
            onClick={() => setColor("rgb(249 115 22)")}
          />
          <button
            className="w-4 h-4 bg-amber-500 "
            type="button"
            onClick={() => setColor("rgb(245 158 11)")}
          />
          <button
            className="w-4 h-4 bg-yellow-500 "
            type="button"
            onClick={() => setColor("rgb(234 179 8)")}
          />
          <button
            className="w-4 h-4 bg-sky-500 "
            type="button"
            onClick={() => setColor("rgb(14 165 233)")}
          />
          <button
            className="w-4 h-4 bg-pink-500 "
            type="button"
            onClick={() => setColor("rgb(236 72 153)")}
          />
          <button
            className="w-4 h-4 bg-violet-500 "
            type="button"
            onClick={() => setColor("rgb(139 92 246)")}
          />
        </div>
        {/* <h3 className="text-sm mt-2 ml-4" style={{ color: theme.color }}>
          Cor secundaria:{" "}
        </h3>
        <div className="p-4 grid grid-cols-4 gap-4">
          <button
            className="w-4 h-4 bg-cyan-500 "
            type="button"
            onClick={() => setBgColor("rgb(6 182 212)")}
          />
          <button
            className="w-4 h-4"
            style={{ background: "rgb(0 0 0)" }}
            type="button"
            onClick={() => setBgColor("rgb(0 0 0)")}
          />

          <button
            className="w-4 h-4 bg-purple-500 "
            type="button"
            onClick={() => setBgColor("rgb(168 85 247)")}
          />
          <button
            className="w-4 h-4 bg-lime-500 "
            type="button"
            onClick={() => setBgColor("rgb(132 204 22)")}
          />
          <button
            className="w-4 h-4 bg-red-600 "
            type="button"
            onClick={() => setBgColor("rgb(239 68 68)")}
          />
          <button
            className="w-4 h-4 bg-white "
            type="button"
            onClick={() => setBgColor("#fff")}
          />
          <button
            className="w-4 h-4 bg-green-500 "
            type="button"
            onClick={() => setBgColor("rgb(34 197 94)")}
          />
          <button
            className="w-4 h-4 bg-orange-500 "
            type="button"
            onClick={() => setBgColor("rgb(249 115 22)")}
          />
          <button
            className="w-4 h-4 bg-amber-500 "
            type="button"
            onClick={() => setBgColor("rgb(245 158 11)")}
          />
          <button
            className="w-4 h-4 bg-yellow-500 "
            type="button"
            onClick={() => setBgColor("rgb(234 179 8)")}
          />
          <button
            className="w-4 h-4 bg-sky-500 "
            type="button"
            onClick={() => setBgColor("rgb(14 165 233)")}
          />
          <button
            className="w-4 h-4 bg-pink-500 "
            type="button"
            onClick={() => setBgColor("rgb(236 72 153)")}
          />
          <button
            className="w-4 h-4 bg-violet-500 "
            type="button"
            onClick={() => setBgColor("rgb(139 92 246)")}
          />
        </div> */}
        <h3 className="text-sm mt-2 ml-4" style={{ color: theme.color }}>
          Moldura do Card:{" "}
        </h3>
        <div className="p-4 flex items-center justify-between gap-2">
          <button
            className="w-8 h-16 "
            type="button"
            onClick={() => setCardFrame("")}
          >
            <div
              className="w-8 h-14 border-solid border-2"
              style={{ borderColor: theme.color }}
            ></div>
          </button>
          <button
            className="w-8 h-16 "
            type="button"
            onClick={() => setCardFrame("purple")}
          >
            <Image
              src={lolCardPurple.src}
              alt="a"
              width={32}
              height={64}
              objectFit="cover"
              objectPosition="center"
              // style={{
              //   width: 488,
              //   height:858,
              //   minHeight:788,
              //   minWidth: 488,
              //   maxWidth: 488,
              //   backgroundSize: "cover",
              // }}
            />
          </button>
          <button
            className="w-8 h-16 "
            type="button"
            onClick={() => setCardFrame("blue")}
          >
            <Image
              src={lolCardBlue.src}
              alt="a"
              width={32}
              height={64}
              objectFit="cover"
              objectPosition="center"
              // style={{
              //   width: 488,
              //   height:858,
              //   minHeight:788,
              //   minWidth: 488,
              //   maxWidth: 488,
              //   backgroundSize: "cover",
              // }}
            />
          </button>
          <button
            className="w-8 h-16 "
            type="button"
            onClick={() => setCardFrame("darkBlue")}
          >
            <Image
              src={lolCardDarkBlue.src}
              alt="a"
              width={32}
              height={64}
              objectFit="cover"
              objectPosition="center"
              // style={{
              //   width: 488,
              //   height:858,
              //   minHeight:788,
              //   minWidth: 488,
              //   maxWidth: 488,
              //   backgroundSize: "cover",
              // }}
            />
          </button>
          <button
            className="w-8 h-16 "
            type="button"
            onClick={() => setCardFrame("red")}
          >
            <Image
              src={lolCardRed.src}
              alt="a"
              width={32}
              height={64}
              objectFit="cover"
              objectPosition="center"
              // style={{
              //   width: 488,
              //   height:858,
              //   minHeight:788,
              //   minWidth: 488,
              //   maxWidth: 488,
              //   backgroundSize: "cover",
              // }}
            />
          </button>
          <button
            className="w-8 h-16 "
            type="button"
            onClick={() => setCardFrame("gold")}
          >
            <Image
              src={lolCardGold.src}
              alt="a"
              width={32}
              height={64}
              objectFit="cover"
              objectPosition="center"
              // style={{
              //   width: 488,
              //   height:858,
              //   minHeight:788,
              //   minWidth: 488,
              //   maxWidth: 488,
              //   backgroundSize: "cover",
              // }}
            />
          </button>
          <button
            className="w-8 h-16 "
            type="button"
            onClick={() => setCardFrame("silver")}
          >
            <Image
              src={lolCardSilver.src}
              alt="a"
              width={32}
              height={64}
              objectFit="cover"
              objectPosition="center"
              // style={{
              //   width: 488,
              //   height:858,
              //   minHeight:788,
              //   minWidth: 488,
              //   maxWidth: 488,
              //   backgroundSize: "cover",
              // }}
            />
          </button>
        </div>
        {/* <h3 className="text-sm mt-2 ml-4">Cor de fundo: </h3>
        <div className="p-4 grid grid-cols-4 gap-4">
          <button
            className="w-4 h-4 bg-cyan-500 "
            type="button"
            onClick={() => setBgColor("rgb(6 182 212)")}
          />
          <button
            className="w-4 h-4 bg-purple-500 "
            type="button"
            onClick={() => setBgColor("rgb(168 85 247)")}
          />
          <button
            className="w-4 h-4 bg-lime-500 "
            type="button"
            onClick={() => setBgColor("rgb(132 204 22)")}
          />
          <button
            className="w-4 h-4 bg-red-600 "
            type="button"
            onClick={() => setBgColor("rgb(239 68 68)")}
          />
          <button
            className="w-4 h-4 bg-white "
            type="button"
            onClick={() => setBgColor("#fff")}
          />
          <button
            className="w-4 h-4 bg-green-500 "
            type="button"
            onClick={() => setBgColor("rgb(34 197 94)")}
          />
          <button
            className="w-4 h-4 bg-orange-500 "
            type="button"
            onClick={() => setBgColor("rgb(249 115 22)")}
          />
          <button
            className="w-4 h-4 bg-amber-500 "
            type="button"
            onClick={() => setBgColor("rgb(245 158 11)")}
          />
          <button
            className="w-4 h-4 bg-yellow-500 "
            type="button"
            onClick={() => setBgColor("rgb(234 179 8)")}
          />
          <button
            className="w-4 h-4 bg-sky-500 "
            type="button"
            onClick={() => setBgColor("rgb(14 165 233)")}
          />
          <button
            className="w-4 h-4 bg-pink-500 "
            type="button"
            onClick={() => setBgColor("rgb(236 72 153)")}
          />
          <button
            className="w-4 h-4 bg-violet-500 "
            type="button"
            onClick={() => setBgColor("rgb(139 92 246)")}
          />
        </div> */}
      </div>
    );
  }
};
