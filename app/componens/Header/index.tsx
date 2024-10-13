"use client";
import { useMyHeader } from "@/app/hooks/navigation";
import { useTheme } from "@/app/hooks/useTheme";
import { Ribeye_Marrow, Orbitron } from "next/font/google";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiSearchAlt, BiSolidHomeHeart } from "react-icons/bi";
import { BsSignpostSplit } from "react-icons/bs";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { GiTomato } from "react-icons/gi";
import { GrGroup, GrPowerReset } from "react-icons/gr";
import { IoPlaySkipForward } from "react-icons/io5";

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

  const { title, paths } = useMyHeader();

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
    <header className="col-span-12 mb-4 ">
      <div className="flex justify-end md:justify-between items-center">
        <Link
          href={""}
          style={{ color: theme.color }}
          className="md:flex gap-2 items-center hidden"
        >
          {paths.map(({ Icon, name }, i,k) => (
            <>
              <Icon style={{ fill: theme.color }} key={i + "a"} />{" "}
              <span key={i + "b"}>
                {name} { (i < k.length-1) && "/"}{" "}
              </span>
            </>
          ))}
        </Link>
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
              <div
                className={`${orbitron.className} text-2xl`}
                style={{ color: theme.color }}
              >
                {Math.floor(time / 60)} :{" "}
                {time % 60 < 10 && time % 60 !== 0 && "0"}
                {time % 60}
                {time % 60 == 0 && "0"}
                <div className="flex gap-2 justify-center">
                  <button onClick={() => setPause((oldState) => !oldState)}>
                    {pause && (
                      <CiPlay1
                        className="w-4 h-4"
                        style={{ fill: theme.color }}
                      />
                    )}
                    {!pause && (
                      <CiPause1
                        className="w-4 h-4"
                        style={{ fill: theme.color }}
                      />
                    )}
                  </button>
                  <GrPowerReset
                    className="w-4 h-4"
                    style={{ fill: theme.color }}
                    onClick={() => setTime(25 * 60)}
                  />
                  <button
                    onClick={() =>
                      setTimeCycle((prevCycle) =>
                        prevCycle === "work" ? "rest" : "work"
                      )
                    }
                  >
                    <IoPlaySkipForward
                      className="w-4 h-4"
                      style={{ fill: theme.color }}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
          <button type="button">
            <BiSearchAlt className=" w-8 h-8" style={{ fill: theme.color }} />
          </button>
          <div
            className="rounded-full border-2  w-8 h-8"
            style={{ borderColor: theme.color }}
          ></div>
        </div>
      </div>
      <h1
        style={{ color: theme.color }}
        className={
          "md:mt-4 -mt-8 text-2xl md:text-4xl " + ribeye_Marrow.className
        }
      >
        {title}
      </h1>
    </header>
  );
};
