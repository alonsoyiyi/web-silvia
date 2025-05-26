"use client";

import { useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/despertarinvisible.webp',
    title: 'El Despertar \n de lo Invisible'
  },
  {
    id: 2,
    image: '/images/preciooscuro.webp',
    title: 'El Precio \n de lo Oscuro'
  },
  {
    id: 3,
    image: '/images/luzcura.webp',
    title: 'La Luz \n que cura'
  },
  {
    id: 4,
    image: '/images/herenciaoculto.webp',
    title: 'Herencia \n de lo Oculto'
  }
];

export default function EpisodesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideClick = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleSlides = () => {
    const slidesCount = slides.length;
    return [
      (currentIndex - 1 + slidesCount) % slidesCount,
      currentIndex,
      (currentIndex + 1) % slidesCount
    ];
  };

  return (
    <div className="w-full overflow-hidden bg-black py-12 -mt-20">
      <div className="flex justify-center items-center gap-8 max-w-[85vw] mx-auto"> {/* Aumentado a 85vw */}
        {getVisibleSlides().map((slideIndex, position) => (
          <div
            key={slides[slideIndex].id}
            onClick={() => position !== 1 && handleSlideClick(slideIndex)}
            className={`
              transition-all duration-500 cursor-pointer shrink-0
              ${position === 1 
                ? 'w-[600px] h-[400px] opacity-100' // Aumentado a 600px
                : 'w-[300px] h-[400px] opacity-50'  // Aumentado a 300px
              }
            `}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={slides[slideIndex].image}
                alt={slides[slideIndex].title}
                fill
                className="object-cover"
                priority={position === 1}
              />
              {position === 1 && (
                <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/50 text-white pl-10">
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
  );
}