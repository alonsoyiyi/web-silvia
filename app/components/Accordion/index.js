'use client';
import AccordionItem from './AccordionItem';

const accordionData = [
  {
    title: "Sección 1",
    content: "Descripción detallada de la sección 1",
    link: "/view1",
    bgImage: "/images/section1.png"
  },
  {
    title: "Sección 2",
    content: "Descripción detallada de la sección 2",
    link: "/view2",
    bgImage: "/images/section2.png"
  },
  {
    title: "Sección 3",
    content: "Descripción detallada de la sección 3",
    link: "/view3",
    bgImage: "/images/section3.png"
  },
  {
    title: "Sección 4",
    content: "Descripción detallada de la sección 4",
    link: "/view4",
    bgImage: "/images/section4.png"
  },
  {
    title: "Sección 5",
    content: "Descripción detallada de la sección 5",
    link: "/view5",
    bgImage: "/images/section5.png"
  },
  {
    title: "Sección 6",
    content: "Descripción detallada de la sección 6",
    link: "/view6",
    bgImage: "/images/section6.png"
  },
  {
    title: "Sección 7",
    content: "Descripción detallada de la sección 7",
    link: "/view7",
    bgImage: "/images/section7.png"
  }
];

export default function Accordion() {
  return (
    <div className="accordion-container">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          {...item}
        />
      ))}
    </div>
  );
}