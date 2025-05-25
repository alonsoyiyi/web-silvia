'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const carouselData = [
    {
        title: "Sobre el Proyecto",
        content: "Adéntrate en nuestro documental y sumérgete en el misterioso mundo de la magia negra y blanca.",
        link: "/view1",
        bgImage: "/images/section1.png"
      },
      {
        title: "Documental",
        content: "Escucha impactantes historias reales sobre sucesos inexplicables, rituales de limpieza y prácticas ocultas.",
        link: "/view2",
        bgImage: "/images/section2.png"
      },
      {
        title: "Podcast",
        content: "Descubre los mitos y verdades que envuelven a la magia y comprende mejor una parte fascinante de nuestra cultura.",
        link: "/view3",
        bgImage: "/images/section3.png"
      },
      {
        title: "Blog - Entre Mitos y Verdades",
        content: "Explora cómo la magia sigue viva en nuestras creencias y cultura.Un viaje entre el misterio y la realidad que revela nuestro patrimonio oculto.",
        link: "/view4",
        bgImage: "/images/section4.png"
      },
      {
        title: "Cómic - El último Conjuro",
        content: "No te pierdas nuestro cómic interactivo, donde tú serás el protagonista y decidirás cómo termina esta historia mágica.",
        link: "/view5",
        bgImage: "/images/section5.png"
      },
      {
        title: "Video Juego - Bruji Aventuras",
        content: "¡Diviértete con un juego lleno de hechizos y sorpresas! Embárcate en una brujiaventura donde cada decisión te acercará a lo inesperado.",
        link: "/view6",
        bgImage: "/images/section6.png"
      },
      {
        title: "Conócenos",
        content: "Somos una productora de jóvenes apasionados que transforma ideas en historias que conectan, inspiran y emocionan. ¡Conócenos!",
        link: "/view7",
        bgImage: "/images/section7.png"
      }
];

// Modificamos las variantes de animación para que sean más simples
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
  }),
  center: {
    x: 0,
    zIndex: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
  }),
};

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [direction, setDirection] = useState(0);

  // Función auxiliar para obtener los índices de las imágenes que se mostrarán
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      let index = currentIndex + i;
      // Ajustamos el índice para crear el efecto de loop
      if (index < 0) {
        index = carouselData.length + index;
      } else if (index >= carouselData.length) {
        index = index - carouselData.length;
      }
      indices.push(index);
    }
    return indices;
  };

  // Modificamos getSlideStyles para incluir la transición de opacidad
  const getSlideStyles = (index) => {
    const position = index - 2;
    
    let styles = {
      position: 'absolute',
      transition: 'all 0.5s ease-in-out',
    };

    switch (position) {
      case 0: // Slide central
        return {
          ...styles,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '350px',
          height: '500px',
          zIndex: 5,
          opacity: 1,
          filter: 'brightness(1.1) contrast(1.1)',
        };
      case -1: // Izquierda inmediata
        return {
          ...styles,
          left: '25%', // Cambiado de 20% a 30% para acercarlo al centro
          transform: 'translateX(-50%) perspective(1000px) rotateY(15deg)',
          width: '220px',
          height: '330px',
          zIndex: 4,
          opacity: 0.9,
          filter: 'brightness(0.9) contrast(1.05)',
        };
      case 1: // Derecha inmediata
        return {
          ...styles,
          left: '75%', // Cambiado de 80% a 70% para acercarlo al centro
          transform: 'translateX(-50%) perspective(1000px) rotateY(-15deg)',
          width: '220px',
          height: '330px',
          zIndex: 4,
          opacity: 0.9,
          filter: 'brightness(0.9) contrast(1.05)',
        };
      case -2: // Far left
        return {
          ...styles,
          left: '10%', // Cambiado de 5% a 10%
          transform: 'translateX(-50%) perspective(1000px) rotateY(30deg)',
          width: '130px',
          height: '195px',
          zIndex: 3,
          opacity: 0.7,
          filter: 'brightness(0.8) contrast(1)',
        };
      case 2: // Far right
        return {
          ...styles,
          left: '90%', // Cambiado de 95% a 90%
          transform: 'translateX(-50%) perspective(1000px) rotateY(-30deg)',
          width: '130px',
          height: '195px',
          zIndex: 3,
          opacity: 0.7,
          filter: 'brightness(0.8) contrast(1)',
        };
      default:
        return {
          ...styles,
          opacity: 0,
          pointerEvents: 'none',
        };
    }
  };

  // Modificar los manejadores de click para incluir la dirección
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => 
      prev === 0 ? carouselData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => 
      prev === carouselData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full h-[85vh] overflow-visible mx-auto max-w-[95%]"> {/* Removido bg-black y cambiado overflow-hidden a overflow-visible */}
      <div className="absolute inset-0 flex items-center justify-center">
        {getVisibleIndices().map((itemIndex, arrayIndex) => (
          <motion.div
            key={`${itemIndex}`}
            style={getSlideStyles(arrayIndex)}
            className="absolute"
            initial={{ opacity: arrayIndex === 0 || arrayIndex === 4 ? 0 : 1 }}
            animate={{ 
              opacity: getSlideStyles(arrayIndex).opacity,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src={carouselData[itemIndex].bgImage}
                alt={carouselData[itemIndex].title}
                fill
                style={{ objectFit: 'cover' }}
                priority={arrayIndex === 2}
              />
              {arrayIndex === 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8 bg-gradient-to-t from-black/70 via-black/50 to-transparent"
                >
                  <h2 className="text-4xl font-bold mb-6">{carouselData[itemIndex].title}</h2>
                  <p className="mb-8 text-lg max-w-2xl">{carouselData[itemIndex].content}</p>
                  <Link
                    href={carouselData[itemIndex].link}
                    className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
                  >
                    Ver más
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 text-white z-10 bg-black/30 px-5 py-3 rounded-full hover:bg-black/50 transition-colors text-2xl font-light"
      >
        &#60;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 text-white z-10 bg-black/30 px-5 py-3 rounded-full hover:bg-black/50 transition-colors text-2xl font-light"
      >
        &#62;
      </button>
    </div>
  );
}