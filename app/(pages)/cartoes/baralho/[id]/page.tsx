import { useTheme } from "@/app/hooks/useTheme";
import Link from "next/link";
import girl from "@/public/images/girl.png";
import Image from "next/image";

export default function Baralho() {
  const { theme } = useTheme();

  return <section className="w-full pl-16 pr-16 ">
      <div className="w-full  rounded-md grid grid-cols-4 gap-4 ">
        <Link
        href={'/cartoes/1'}
          className=" border-2 rounded-md   p-8"
          style={{ borderColor: theme.color }}
        >
          <div className="flex items-center justify-center  rounded-md border-2  " style={{borderColor:theme.color}}>
            <Image
              src={girl.src}
              alt="girl"
              width={44}
              height={44}
              className="w-full h-44 rounded-md "
            />
          </div>
              <h2
                className="text-center text-2xl font-bold mt-4"
                style={{ color: theme.color }}
              >
                Titulo
              </h2>
        </Link>
      </div>
  </section>;
}
