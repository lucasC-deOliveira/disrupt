"use client";

import { useTheme } from "@/app/hooks/useTheme";

interface InputDefaultProps {
  name: string;
  height?: string;
}

export const InputDefault = ({ name, height = "16" }: InputDefaultProps) => {
  const { theme } = useTheme();
  return (
    <label
      htmlFor={name.replace(" ", "")}
      className={`relative   block rounded-md border  shadow-sm focus-within:border-white focus-within:ring-1 focus-within:ring-white`}
      style={{ borderColor: theme.color, height:`${height}rem` }}
    >
      <input
        type="text"
        id={name.replace(" ", "")}
        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={name}
      />

      <span
        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-black p-0.5 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
        style={{ color: theme.color }}
      >
        {name}
      </span>
    </label>
  );
};
