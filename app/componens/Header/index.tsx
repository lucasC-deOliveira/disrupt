"use client";
import Image from "next/image";
import { useMyHeader } from "@/app/hooks/navigation";
import { useTheme } from "@/app/hooks/useTheme";
import { Ribeye_Marrow, Orbitron } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { GiTomato } from "react-icons/gi";
import { IoMdArrowRoundBack } from "react-icons/io";
import gumball from "../../../public/images/gumball.jpg";
import { PomodoroTimer } from "../Timer";

const ribeye_Marrow = Ribeye_Marrow({
  subsets: ["latin"],
  weight: "400",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "400",
});

export const Header = () => {
  const { theme } = useTheme();

  const [time, setTime] = useState(2);

  const [showTimer, setShowTimer] = useState(false);

  const [timeCycle, setTimeCycle] = useState<"work" | "rest">("work");

  const [pause, setPause] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { title, paths, backButton } = useMyHeader();

  const { back } = useRouter();

  const handleResetByTimeCycle = useCallback(() => {
    setTime(timeCycle === "work" ? 25 * 60 : 5 * 60);
  }, [timeCycle]);

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!pause) {
      startTimer();
    } else {
      stopTimer();
    }

    return stopTimer; // Limpar o intervalo quando o componente desmonta ou pausa muda.
  }, [pause, startTimer, stopTimer]);

  useEffect(() => {
    if (time <= 0) {
      setTimeCycle((prevCycle) => (prevCycle === "work" ? "rest" : "work"));
      handleResetByTimeCycle();
      // setPause(true); // Pausa automaticamente ao mudar de ciclo
    }
  }, [time, handleResetByTimeCycle]);

  useEffect(() => {
    handleResetByTimeCycle(); // Ajusta o tempo quando o ciclo muda.
  }, [timeCycle, handleResetByTimeCycle]);

  const handlerPause = () => {
    setPause((oldState) => !oldState);
  };

  const changeTime = (seconds: number) => {
    setTime(seconds);
  };

  const changeTimeCycle = () => {
    setTimeCycle((prevCycle) => (prevCycle === "work" ? "rest" : "work"));
  };
  // const handleResetByTimeCycle = useCallback(() => {
  //   if (timeCicle == "work") {
  //     setTime(25 * 60);
  //   } else {
  //     setTime(5 * 60);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!pause && time > 1) {
  //     intervalRef.current = setInterval(() => {
  //       setTime((prevNum: number) => prevNum - 1);
  //     }, 1000);
  //   } else {
  //     if (timeCicle == "work") {
  //       setTimeCicle("rest");
  //     } else if (timeCicle == "rest") {
  //       setTimeCicle("work");
  //     }
  //     clearInterval(intervalRef.current);
  //   }

  //   return () => clearInterval(intervalRef.current);
  // }, [pause]);

  // useEffect(() => {
  //   handleResetByTimeCycle();
  // }, [handleResetByTimeCycle, timeCicle]);

  return (
    <header
      className="col-span-12 mb-4 p-4 rounded-md border-2 bg-black bg-opacity-90  transition-all duration-300  tracking-wide"
      style={{
        borderColor: theme.color,
        boxShadow: `0 0 15px ${theme.color}, 0 0 30px ${theme.color},0 0 45px rgba(0, 255, 255, 0.2), 0 0 60px ${theme.color}`,
        transition: "box-shadow 0.3s ease ",
        animation: "pulseNeon 2s infinite ease-in-out",
      }}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 ">
            {backButton && (
              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 min-h-8 min-w-8 rounded-full  border-2 border-solid "
                style={{ color: theme.color, borderColor: theme.color }}
                onClick={back}
              >
                <IoMdArrowRoundBack />
              </button>
            )}
            <div
              style={{ color: theme.color }}
              className="md:flex gap-2 items-center hidden"
            >
              {paths.map(({ Icon, name, link }, i, k) => (
                <Link className="flex items-center gap-1 " href={link} key={i}>
                  <Icon style={{ fill: theme.color }} />{" "}
                  <span>
                    {name} {i < k.length - 1 && "/"}{" "}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <h1
            style={{ color: theme.color }}
            className={"text-2xl md:text-4xl my-4 " + ribeye_Marrow.className}
          >
            {title}
          </h1>
        </div>
        <div className=" flex gap-6 items-center">
          <div
            className="flex gap-2 items-center justify-center font-bold h-full"
            style={{ color: theme.color }}
          >
            <button
              onClick={() =>
                setShowTimer((oldState) => {
                  if (!oldState === false) {
                    setPause(true);
                    // handeResetByTimeCycle();
                  } else {
                    setPause(false);
                  }
                  return !oldState;
                })
              }
            >
              <GiTomato className="w-8 h-8" style={{ fill: theme.color }} />
            </button>

            {showTimer && (
              <PomodoroTimer
                changeTime={changeTime}
                changeTimeCycle={changeTimeCycle}
                color={theme.color}
                font={orbitron.className}
                handlerPause={handlerPause}
                pause={pause}
                time={time}
              />
            )}
          </div>
          <div
            className="rounded-full border-2  w-16 h-16 p-1"
            style={{ borderColor: theme.color }}
          >
            <Image
              className="w-full h-full rounded-full"
              src={gumball.src}
              alt="foto de perfil"
              width={25}
              height={25}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
