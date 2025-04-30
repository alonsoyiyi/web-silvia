'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const teamData = [
  {
    id: 1,
    image: '/team/1.webp',
    name: 'Alexander García',
    role: 'Director Creativo',
    bio: 'Líder visionario con más de 8 años de experiencia en proyectos transmedia. Apasionado por contar historias que conecten con las personas.',
  },
  {
    id: 2,
    image: '/team/2.webp',
    name: 'Marina López',
    role: 'Productora Ejecutiva',
    bio: 'Especialista en gestión de proyectos audiovisuales con un enfoque en contenido documental y narrativas innovadoras.',
  },
  {
    id: 3,
    image: '/team/3.webp',
    name: 'Carlos Ruiz',
    role: 'Director de Fotografía',
    bio: 'Fotógrafo premiado con un ojo único para capturar momentos mágicos y transformarlos en historias visuales impactantes.',
  },
  {
    id: 4,
    image: '/team/4.webp',
    name: 'Ana Martínez',
    role: 'Diseñadora de Sonido',
    bio: 'Creadora de paisajes sonoros inmersivos que transportan a la audiencia a mundos extraordinarios.',
  },
  {
    id: 5,
    image: '/team/5.webp',
    name: 'Diego Torres',
    role: 'Desarrollador de Videojuegos',
    bio: 'Programador creativo especializado en crear experiencias interactivas que desafían los límites de la narrativa tradicional.',
  },
  {
    id: 6,
    image: '/team/6.webp',
    name: 'Laura Sánchez',
    role: 'Guionista',
    bio: 'Escritora apasionada por entrelazar realidad y ficción en historias que cautivan y transforman.',
  },
  {
    id: 7,
    image: '/team/7.webp',
    name: 'Roberto Mendoza',
    role: 'Artista 3D',
    bio: 'Creador de mundos virtuales y experiencias visuales que desafían la imaginación.',
  },
  {
    id: 8,
    image: '/team/8.webp',
    name: 'Patricia Vega',
    role: 'Directora de Arte',
    bio: 'Artista visual con una visión única para crear atmósferas y estéticas memorables.',
  },
  {
    id: 9,
    image: '/team/9.webp',
    name: 'Juan Castro',
    role: 'Editor Audiovisual',
    bio: 'Maestro en el arte de dar ritmo y vida a las historias a través del montaje.',
  },
  {
    id: 10,
    image: '/team/10.webp',
    name: 'Sofia Ramírez',
    role: 'Community Manager',
    bio: 'Experta en crear comunidades y conectar con las audiencias a través de las redes sociales.',
  }
];

const PyramidImage = ({ person, onClick, isRotating }) => {
  return (
    <motion.div
      className="relative w-28 h-28 rounded-full overflow-hidden cursor-pointer"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => onClick(person)}
      animate={{ 
        rotate: isRotating ? -360 : 0
      }}
      transition={{ 
        duration: 30, 
        repeat: Infinity, 
        ease: "linear",
        scale: {
          duration: 0.2,
          ease: "easeOut"
        }
      }}
      style={{
        transformOrigin: 'center center'
      }}
    >
      <Image
        src={person.image}
        alt={person.name}
        fill
        className="object-cover"
      />
    </motion.div>
  );
};

const PersonModal = ({ person, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        className="relative w-[80%] max-w-2xl bg-black/80 p-8 rounded-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full h-[400px] mb-4">
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{person.name}</h2>
        <p className="text-xl text-white/80 mb-4">{person.role}</p>
        <p className="text-white/60">{person.bio}</p>
      </motion.div>
    </motion.div>
  );
};

export default function View7() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-10 gap-8 overflow-hidden">
      <div className="w-full flex items-center justify-center relative">
        <Link 
          href="/"
          className="absolute left-10 px-6 py-2 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
        >
          Volver
        </Link>
      </div>

      <motion.div
        className="relative w-[500px] h-[500px] flex items-center justify-center -mt-10"
        style={{
          transformOrigin: '50% 64%'
        }}
        animate={isRotating ? { rotate: 360 } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Nivel 1 (top) */}
        <div className="absolute top-[0%] left-1/2 -translate-x-1/2">
          <PyramidImage 
            person={teamData[0]} 
            onClick={(person) => {
              setSelectedPerson(person);
              setIsRotating(false);
            }}
            isRotating={isRotating}
          />
        </div>

        {/* Nivel 2 */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 flex gap-20">
          {teamData.slice(1, 3).map(person => (
            <PyramidImage 
              key={person.id} 
              person={person}
              onClick={(person) => {
                setSelectedPerson(person);
                setIsRotating(false);
              }}
              isRotating={isRotating}
            />
          ))}
        </div>

        {/* Nivel 3 */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 flex gap-16">
          {teamData.slice(3, 6).map(person => (
            <PyramidImage 
              key={person.id} 
              person={person}
              onClick={(person) => {
                setSelectedPerson(person);
                setIsRotating(false);
              }}
              isRotating={isRotating}
            />
          ))}
        </div>

        {/* Nivel 4 (bottom) */}
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 flex gap-12">
          {teamData.slice(6, 10).map(person => (
            <PyramidImage 
              key={person.id} 
              person={person}
              onClick={(person) => {
                setSelectedPerson(person);
                setIsRotating(false);
              }}
              isRotating={isRotating}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPerson && (
          <PersonModal 
            person={selectedPerson} 
            onClose={() => {
              setSelectedPerson(null);
              setIsRotating(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}