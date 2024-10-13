'use client'
import { useTheme } from "@/app/hooks/useTheme";
import { Ribeye_Marrow } from "next/font/google";
import Link from "next/link"
import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { GiBoomerangSun } from "react-icons/gi"
import { GrGroup } from "react-icons/gr";
import { IoDocumentOutline } from "react-icons/io5";

const ribeye_Marrow = Ribeye_Marrow({
    subsets: ["latin"],
    weight: "400"
  });

export const Sidebar = () => {
  const {theme} = useTheme()
const [height, setHeight] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window?.innerHeight | 0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
    return (
        <aside className="col-span-3 lg:col-span-2 row-span-12  hidden md:block " style={{height:height-150+ "px"}}>
        <nav className=" border-2  rounded-md h-full" style={{borderColor:theme.color}}>
          <div className="flex gap-4 items-center p-4 ">
            <button type="button" className="rounded-full border-2 w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center" style={{borderColor:theme.color}}>
            <GiBoomerangSun  className="h-12 width-12 animate-spin" style={{fill:theme.color}}/>
            </button>
          <h2 style={{color:theme.color}} className={"text-xl lg:text-2xl "+ ribeye_Marrow.className}>
           Disrupt
            </h2>
          </div>
            <hr className="mx-2" style={{borderColor:theme.color}}/>
            <ul className="p-4 mb-80 flex flex-col gap-4 " style={{color:theme.color}}>
              {/* <li><Link href="/provas" className="flex gap-4 items-center"><IoDocumentOutline className="w-6 h-6" /> Provas</Link></li> */}
              {/* <li><Link href="" className="flex gap-4 items-center"> <FaBook className="w-6 h-6"/>Questões </Link></li> */}
              <li><Link href="/cartoes" className="flex gap-4 items-center"><FaRegPenToSquare className="w-6 h-6" />Cartões</Link></li>
              {/* <li><Link href="" className="flex gap-4 items-center"><GrGroup className="w-6 h-6"/> Social</Link></li>        */}
            </ul>
            </nav>

      </aside>
    )
}