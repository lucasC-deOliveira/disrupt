'use client'
import Image from "next/image";
import { useTheme } from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import { useMyHeader } from "@/app/hooks/navigation";
import { BiSolidHomeHeart } from "react-icons/bi";
import { CiPickerHalf } from "react-icons/ci";

export default function Tema() {
    const { changeTitle, changePaths, changeBackButton } = useMyHeader()
    const [animationKeyframes, setAnimationKeyframes] = useState(0);

    const { theme, handleSetTheme } = useTheme();


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
        changeTitle("Tema");
        changePaths([
            {
                name: "Home",
                Icon: BiSolidHomeHeart,
                link: "/cartoes",
            },
            {
                name: "Tema",
                Icon: CiPickerHalf,
                link: "/tema",
            },

        ]);
        changeBackButton(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <section className="  w-full px-40 relative">
            <div className="border  rounded-md w-full  bg-black opacity-90" style={{ borderColor: theme.color }}>
                <h1 className="m-4" style={{ color: theme.color }}>Cor Principal:</h1>
                <div className="p-4 grid grid-cols-4 gap-4">
                    <button
                        className="w-8 h-8 bg-cyan-500 "
                        style={{ backgroundColor: "rgb(88,125,160)" }}
                        type="button"
                        onClick={() => setColor("rgb(88,125,160)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(251,159,252)" }}
                        onClick={() => setColor("rgb(251,159,252)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(173,235,255)" }}
                        onClick={() => setColor("rgb(173,235,255)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(200,68,82)" }}
                        onClick={() => setColor("rgb(200,68,82)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(228,212,113)" }}
                        onClick={() => setColor("rgb(228,212,113)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(186,198,194)" }}
                        onClick={() => setColor("rgb(186,198,194)")}
                    />
                    <button
                        className="w-8 h-8 bg-cyan-500 "
                        type="button"
                        onClick={() => setColor("rgb(6 182 212)")}
                    />
                    <button
                        className="w-8 h-8 bg-purple-500 "
                        type="button"
                        onClick={() => setColor("rgb(168 85 247)")}
                    />
                    <button
                        className="w-8 h-8 bg-lime-500 "
                        type="button"
                        onClick={() => setColor("rgb(132 204 22)")}
                    />
                    <button
                        className="w-8 h-8 bg-red-600 "
                        type="button"
                        onClick={() => setColor("rgb(239 68 68)")}
                    />
                    <button
                        className="w-8 h-8 bg-white "
                        type="button"
                        onClick={() => setColor("#fff")}
                    />
                    <button
                        className="w-8 h-8 bg-green-500 "
                        type="button"
                        onClick={() => setColor("rgb(34 197 94)")}
                    />
                    <button
                        className="w-8 h-8 bg-orange-500 "
                        type="button"
                        onClick={() => setColor("rgb(249 115 22)")}
                    />
                    <button
                        className="w-8 h-8 bg-amber-500 "
                        type="button"
                        onClick={() => setColor("rgb(245 158 11)")}
                    />
                    <button
                        className="w-8 h-8 bg-yellow-500 "
                        type="button"
                        onClick={() => setColor("rgb(234 179 8)")}
                    />
                    <button
                        className="w-8 h-8 bg-sky-500 "
                        type="button"
                        onClick={() => setColor("rgb(14 165 233)")}
                    />
                    <button
                        className="w-8 h-8 bg-pink-500 "
                        type="button"
                        onClick={() => setColor("rgb(236 72 153)")}
                    />
                    <button
                        className="w-8 h-8 bg-violet-500 "
                        type="button"
                        onClick={() => setColor("rgb(139 92 246)")}
                    />
                </div>
                <h1 className="m-4" style={{ color: theme.color }}>Cor De Fundo:</h1>
                <div className="p-4 grid grid-cols-4 gap-4">
                <button
                        className="w-8 h-8 bg-cyan-500 "
                        style={{ backgroundColor: "rgb(88,125,160)" }}
                        type="button"
                        onClick={() => setBgColor("rgb(88,125,160)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(251,159,252)" }}
                        onClick={() => setBgColor("rgb(251,159,252)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(173,235,255)" }}
                        onClick={() => setBgColor("rgb(173,235,255)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(200,68,82)" }}
                        onClick={() => setBgColor("rgb(200,68,82)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(228,212,113)" }}
                        onClick={() => setBgColor("rgb(228,212,113)")}
                    />
                    <button
                        className="w-8 h-8"
                        type="button"
                        style={{ backgroundColor: "rgb(186,198,194)" }}
                        onClick={() => setBgColor("rgb(186,198,194)")}
                    />
                    <button
                        className="w-8 h-8 bg-cyan-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(6 182 212)")}
                    />
                    <button
                        className="w-8 h-8 bg-purple-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(168 85 247)")}
                    />
                    <button
                        className="w-8 h-8 bg-lime-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(132 204 22)")}
                    />
                    <button
                        className="w-8 h-8 bg-red-600 "
                        type="button"
                        onClick={() => setBgColor("rgb(239 68 68)")}
                    />
                    <button
                        className="w-8 h-8 bg-white "
                        type="button"
                        onClick={() => setBgColor("#fff")}
                    />
                    <button
                        className="w-8 h-8 bg-green-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(34 197 94)")}
                    />
                    <button
                        className="w-8 h-8 bg-orange-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(249 115 22)")}
                    />
                    <button
                        className="w-8 h-8 bg-amber-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(245 158 11)")}
                    />
                    <button
                        className="w-8 h-8 bg-yellow-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(234 179 8)")}
                    />
                    <button
                        className="w-8 h-8 bg-sky-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(14 165 233)")}
                    />
                    <button
                        className="w-8 h-8 bg-pink-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(236 72 153)")}
                    />
                    <button
                        className="w-8 h-8 bg-violet-500 "
                        type="button"
                        onClick={() => setBgColor("rgb(139 92 246)")}
                    />
                </div>

 
            </div>
        </section>
    );
}
