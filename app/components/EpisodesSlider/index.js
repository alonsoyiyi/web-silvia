"use client";

import { useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/balanza.webp',
    title: 'El Despertar \n de lo Invisible'
  },
  {
    id: 2,
    image: '/images/preciooscuro.webp',
    title: 'El Precio \n de lo Oscuro'
  },
  {
    id: 3,
    image: '/images/brujita.webp',
    title: 'La Luz \n que cura'
  },
  {
    id: 4,
    image: '/images/cruz.webp',
    title: 'El otro lado \n de la Creencia'
  }
  ,
  {
    id: 5,
    image: '/images/vela.webp',
    title: 'Entre sombras \ny Luces'
  }
];

export default function EpisodesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const getVisibleSlides = () => {
    const prev = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    const next = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    return [prev, activeIndex, next];
  };

  return (
    <div className="w-full py-12 -mt-20 relative overflow-hidden">
      <div className="max-w-[1200px] h-[500px] mx-auto relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {getVisibleSlides().map((slideIndex, position) => (
              <div
                key={slides[slideIndex].id}
                onClick={() => position !== 1 && setActiveIndex(slideIndex)}
                className={`
                  absolute top-0 left-1/2
                  transition-all duration-700 ease-in-out cursor-pointer
                  ${position === 1 ? 'z-20' : 'z-10'}
                `}
                style={{
                  transform: `translateX(${position === 0 ? '-180%' : position === 1 ? '-50%' : '80%'})`, // Increased spacing
                }}
              >
                <div className={`
                  relative overflow-hidden rounded-lg transition-all duration-700
                  ${position === 1
                    ? 'w-[500px] h-[500px] opacity-100' 
                    : 'w-[300px] h-[400px] opacity-60 hover:opacity-80 translate-y-12'} // Increased from opacity-40 to opacity-60
                `}>
                  <Image
                    src={slides[slideIndex].image}
                    alt={slides[slideIndex].title}
                    fill
                    className={`
                      transition-all duration-500
                      ${position === 1 ? 'object-contain brightness-110' : 'object-cover brightness-75'} // Added brightness-75
                    `}
                    priority={position === 1}
                  />
                  {position === 1 && (
                    <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/50 text-white pl-16">
                      <h3 className="text-6xl font-bold mb-6 whitespace-pre-line text-left">
                        {slides[slideIndex].title}
                      </h3>
                      <button className="px-4 py-2 bg-white text-black rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                        <Image
                          src="/images/play.svg"
                          alt="Play icon"
                          width={24}
                          height={24}
                          className="brightness-0"
                        />
                        Ver video
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}