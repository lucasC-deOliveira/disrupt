'use client'
import Image from "next/image";
import robot from "../public/images/robot.png"
import { useTheme } from "./hooks/useTheme";
export default function Home() {
  const {theme} = useTheme()
  return (
    <section className="  w-full px-40 relative">
      <div className="border  rounded-md w-full h-40" style={{borderColor:theme.color}}>
      <textarea 
      className="w-full h-full bg-red rounded-md resize-none p-4 bg-transparent " 
       placeholder="O que voce esta estudando agora?"
       ></textarea>
      </div>
      <button className="absolute right-48 mt-2 border-2 rounded-md px-4 py-2"style={{borderColor:theme.color, color:theme.color}} >
        Publicar
      </button>
      <div className="w-full border-2 rounded-md mt-24 p-4" style={{borderColor:theme.color}}>
        <div className="w-12 h-12 border-2 rounded-full " style={{borderColor:theme.color}}>
        </div>
        <div className="flex items-center flex-col gap-4">
        <Image src={robot.src} alt="robos" width={robot.width} height={robot.width}/>
        <h3 style={{color:theme.color}}>O futuro da inteligencia artificial</h3>
        <p className="px-4" style={{color:theme.color}}>
          
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere et augue et rhoncus. Ut mi nisi, egestas non tincidunt sed, placerat eu felis. Nam ultrices libero vel orci fringilla, eu luctus nunc condimentum. Fusce blandit purus gravida justo rutrum, ac molestie ipsum posuere. Quisque ultricies, ante eu molestie vestibulum, tortor tellus ultrices eros, sed ornare lectus nisi consectetur enim. Donec congue leo ut dui eleifend, id semper leo consequat. Quisque sed quam arcu. Fusce consequat tincidunt metus, ornare hendrerit arcu. Nam nec justo in enim posuere ultrices et ultricies augue. Maecenas posuere placerat condimentum. Etiam at gravida ipsum. Donec bibendum id quam ultricies tempor. Integer venenatis, est a molestie fringilla, urna lacus luctus arcu, eu tincidunt orci augue non magna.

Curabitur at lacus tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent arcu lectus, vehicula a luctus sed, auctor vitae leo. Nulla id suscipit nunc. Maecenas sem urna, sodales a sodales a, eleifend sed enim. Sed vel faucibus magna. Aenean nec tempor velit. Etiam nibh libero, facilisis eu porttitor sit amet, consectetur eget nisi. Sed interdum dictum purus, sed luctus elit malesuada et. Praesent non nulla justo. Mauris placerat ultricies odio. Aenean convallis tincidunt finibus. Pellentesque vitae ante ut nisi dictum pellentesque a sit amet orci. Aliquam erat volutpat. In condimentum enim sit amet massa luctus volutpat. In lorem massa, pharetra at turpis porta, suscipit tincidunt elit.
        </p>
        </div>
      </div>
    </section>
  );
}
