"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

export const ConfigButton = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    });
  };

  const setBgColor = (color: string) => {
    handleSetTheme({
      color:theme.color,
      background: color,
    });
  };

  if (!isOpen) {
    return (
      <button
        className="w-8 h-8  border-2 rounded-md items-center justify-center flex"
        style={{borderColor:theme.color}}
        onClick={() => handleOpenButton()}
      >
        <AiFillSetting className="w-6 h-6 animate-spin " style={{fill:theme.color}} />
      </button>
    );
  } else {
    return (
      <div
        className={`absolute end-0 z-10 mt-2 w-40 rounded-md border-2 bg-black shadow-lg relative`}
        style={{ borderColor: theme.color }}
        role="menu"
      >
        <h3 className="text-sm text-center mt-2 font-bold" style={{color:theme.color}}>Tema</h3>
        <hr style={{borderColor:theme.color}}/>
        <button className="absolute top-2 right-2" onClick={()=> handleCloseButton()}>
          <IoClose style={{fill:theme.color}} />
        </button>
        <h3 className="text-sm mt-2 ml-4" style={{color:theme.color}}>Cor principal: </h3>
        <div className="p-4 grid grid-cols-4 gap-4">
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
