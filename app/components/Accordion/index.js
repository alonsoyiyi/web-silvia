'use client';
import { useState, useEffect } from 'react';
import AccordionItem from './AccordionItem';

const accordionData = [
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

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileToggle = (index) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <div className="accordion-container">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          {...item}
          mobileProps={isMobile ? {
            isActive: activeIndex === index,
            onToggle: () => handleMobileToggle(index)
          } : null}
        />
      ))}
    </div>
  );
}