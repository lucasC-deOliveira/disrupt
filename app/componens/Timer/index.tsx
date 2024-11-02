import { IoPlaySkipForward } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { CiPause1, CiPlay1 } from "react-icons/ci";

interface IPomodoroTimer {
  handlerPause: () => void;
  changeTimeCycle: () => void;
  color: string;
  time: number;
  font: string;
  pause: boolean;
  changeTime: (seconds: number) => void;
}

export const PomodoroTimer = ({
  time,
  color,
  font,
  handlerPause,
  pause,
  changeTime,
  changeTimeCycle,
}: IPomodoroTimer) => {
  return (
    <div className={`${font} text-2xl`} style={{ color }}>
      {Math.floor(time / 60)} : {time % 60 < 10 && time % 60 !== 0 && "0"}
      {time % 60}
      {time % 60 == 0 && "0"}
      <div className="flex gap-2 justify-center">
        <button onClick={handlerPause}>
          {pause && <CiPlay1 className="w-4 h-4" style={{ fill: color }} />}
          {!pause && <CiPause1 className="w-4 h-4" style={{ fill: color }} />}
        </button>
        <GrPowerReset
          className="w-4 h-4"
          style={{ fill: color }}
          onClick={() => changeTime(25 * 60)}
        />
        <button onClick={changeTimeCycle}>
          <IoPlaySkipForward className="w-4 h-4" style={{ fill: color }} />
        </button>
      </div>
    </div>
  );
};
