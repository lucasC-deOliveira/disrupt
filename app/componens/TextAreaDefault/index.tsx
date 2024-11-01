"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { InputHTMLAttributes } from "react";

interface InputDefaultProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  height?: string;
  color?:string
}

export const TextAreaDefault = ({
  name,
  height = "16",
  color,
  ...rest
}: InputDefaultProps) => {
  const { theme } = useTheme();
  return (
    <label
      htmlFor={name.replace(" ", "")}
      className={`relative   block rounded-md border  shadow-sm focus-within:border-white focus-within:ring-1 focus-within:ring-white p-4`}
      style={{ borderColor: theme.color, height: `${height}rem` }}
    >
      <textarea
        type="text"
        id={name.replace(" ", "")}
        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-full w-full"
        placeholder={name}
        style={{color:!!color? color:""}}
        {...rest}
      >
        <span
          className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-black p-0.5 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
          style={{ color: theme.color }}
        >
          {name}
        </span>
      </textarea>
    </label>
  );
};
