'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const specialists = [
  {
    id: 6,
    name: 'Milagros Albarracín',
    image: '/images/MILAGROS-ALBARRACIN.webp',
    role: 'Médium y psíquica'
  },
  {
    id: 2,
    name: 'Helen Alejandro',
    image: '/images/HELEN-ALEJANDRO.webp',
    role: 'Afectada por brujería'
  },
  {
    id: 1,
    name: 'Gerardo Menacho',
    image: '/images/GERARDO-MENACHO.webp',
    role: 'Escéptico'
  },
  {
    id: 3,
    name: 'Jesús Lazo',
    image: '/images/JESUS-LAZO.webp',
    role: 'Psicóloga'
  },
  {
    id: 4,
    name: 'Kelly Pairazaman',
    image: '/images/KELLY-PAIRAZAMAN.webp',
    role: 'Afectada por brujería'
  },
  {
    id: 5,
    name: 'Luis Felipe Pardo',
    image: '/images/LUIS-FELIPE-PARDO.webp',
    role: 'Cura'
  },
  {
    id: 7,
    name: 'Angela Alejos',
    image: '/images/ANGELA-ALEJOS.webp',
    role: 'Chamana'
  }
];

const slideVariants = {
    enter: (custom) => ({
        x: custom.direction > 0 ? '110%' : '-110%',
        scale: 0.7,
        opacity: 1,
        zIndex: 0,
        rotateX: 0,
        rotateY: custom.direction > 0 ? 45 : -45,
        transformPerspective: 1000
    }),
    center: (custom) => {
        switch (custom.position) {
            case 0:
                return {
                    x: '0%',
                    scale: 1,
                    opacity: 1,
                    zIndex: 5,
                    rotateX: 0,
                    rotateY: 0,
                    transformPerspective: 1000
                };
            case -1:
                return {
                    x: '-75%',
                    scale: 0.85,
                    opacity: 1,
                    zIndex: 4,
                    rotateX: 0,
                    rotateY: 30,
                    transformPerspective: 1000
                };
            case 1:
                return {
                    x: '75%',
                    scale: 0.85,
                    opacity: 1,
                    zIndex: 4,
                    rotateX: 0,
                    rotateY: -30,
                    transformPerspective: 1000
                };
            case -2:
                return {
                    x: '-140%',
                    scale: 0.7,
                    opacity: 1,
                    zIndex: 3,
                    rotateX: 0,
                    rotateY: 45,
                    transformPerspective: 1000
                };
            case 2:
                return {
                    x: '140%',
                    scale: 0.7,
                    opacity: 1,
                    zIndex: 3,
                    rotateX: 0,
                    rotateY: -45,
                    transformPerspective: 1000
                };
            default:
                return {
                    x: '0%',
                    scale: 1,
                    opacity: 1,
                    zIndex: 1,
                    rotateX: 0,
                    rotateY: 0,
                    transformPerspective: 1000
                };
        }
    },
    exit: (custom) => ({
        x: custom.direction > 0 ? '-110%' : '110%',
        scale: 0.7,
        opacity: 1,
        zIndex: 0,
        rotateX: 0,
        rotateY: custom.direction > 0 ? -45 : 45,
        transformPerspective: 1000
    })
};

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const getVisibleIndices = () => {
        const indices = [];
        const totalSlides = specialists.length;
        
        for (let i = -2; i <= 2; i++) {
            let index = currentIndex + i;
            if (index < 0) {
                index = totalSlides + index;
            } else if (index >= totalSlides) {
                index = index % totalSlides;
            }
            indices.push(index);
        }
        return indices;
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? specialists.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex(prevIndex => 
            prevIndex === specialists.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full h-[500px] overflow-visible mx-auto" style={{ perspective: '2000px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence initial={false}>
                    {getVisibleIndices().map((itemIndex, arrayIndex) => {
                        const position = arrayIndex - 2;
                        const specialist = specialists[itemIndex];
                        
                        return (
                            <motion.div
                                key={`slide-${itemIndex}-${direction}`}
                                custom={{ direction, position }}
                                style={{
                                    position: 'absolute',
                                    width: position === 0 ? '300px' : '250px',
                                    height: position === 0 ? '400px' : '350px',
                                    transformOrigin: 'center center'
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={slideVariants}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 25,
                                    mass: 0.5,
                                    duration: 0.5
                                }}
                            >
                                <div className="relative w-full h-full rounded-xl overflow-hidden">
                                    <Image
                                        src={specialist.image}
                                        alt={specialist.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {position === 0 && (
                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                            <h3 className="text-white text-2xl font-bold mb-2">{specialist.name}</h3>
                                            <p className="text-white/80 text-lg">{specialist.role}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <button
                onClick={handlePrev}
                className="absolute left-10 top-1/2 z-20 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button
                onClick={handleNext}
                className="absolute right-10 top-1/2 z-20 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default function PodcastPage() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Primera sección - Hero */}
      <div
        className="w-full aspect-[16/9] relative flex flex-col items-start py-12 px-20"
        style={{
          backgroundImage: "url('/images/fondoproyectot.webp')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'black'
        }}
      >
        {/* Botón volver */}
        <div className="w-full -mt-4">
          <Link
            href="/"
            className="px-6 py-2 bg-black text-white font-semibold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <Image
              src="/images/ojovolver.svg"
              alt="Volver icon"
              width={32}
              height={32}
              className="brightness-0 invert"
            />
            Volver
          </Link>
        </div>

        {/* Contenido central */}
        <div className="flex flex-col items-start gap-8 text-white mt-16">
          <h1 className="text-6xl text-left">
            Nuestro proyecto <br />Transmedial
          </h1>
  <a 
                        href="https://www.youtube.com/@Entresombrasyluces-i7t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-1 bg-white text-black rounded-full hover:scale-105 transition-transform text-lg cursor-pointer"
                    >
                        <Image
                            src="/images/instagram-svgrepo-com.svg"
                            alt="Instagram icon"
                            width={32}
                            height={32}
                            className="brightness-0"
                        />
                        Ver más
                    </a>
        </div>

        {/* Texto inferior */}
        <div className="text-white w-full mt-auto mb-12">
          <h2 className="text-3xl mb-4 text-left">Sobre el proyecto</h2>
          <p className="text-l text-left w-full">
            La historia de Entre sombras y luces te sumerge en un viaje entre lo místico y lo racional. En este documental transmedial, explortamos cómo la magia blanca y negra sigue presente en la vida cotidiana de muchas personas, generando creencias, dudas y debates sobre su impacto en la sociedad moderna. A o largo de los cinco capítulos, viajamos entre los misterios, presentando a quienes la practican, la creen y la cuestionan.
          </p>
        </div>
      </div>

      {/* Segunda sección - Contenido centrado */}
      <div className="w-full bg-black py-2 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Nuestros Personajes y Especialistas
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mx-auto max-w-6xl mb-8">
            En este documental se presentan tres personajes principales: chamanes y brujos. Además, aparecen personajes reales que actúan como testigos y guías a lo largo del viaje. Entre ellos se incluyen practicantes de magia (tanto blanca como negra), científicos, historiadores y escépticos, quienes aprotan diversas perspecticas sobre el tema.
          </p>
          <Carousel />
        </div>
      </div>

      {/* Tercera sección - Brazos Transmediales */}
      <div className="w-full bg-black py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            Sobre nuestros Brazos Transmediales
          </h2>
          
          {/* Primer div */}
          <div className="flex items-center gap-8 mb-16">
            <div className="w-[40%] flex flex-col items-center">
              <div className="relative w-[80%] aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/images/blog.png"
                  alt="Podcast"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mt-4">Entre el Miedo y la Fe</h3>
            </div>
            <p className="w-[60%] text-lg text-white/80 text-justify">
              Contaremos con un blog transmedial en la plataforma X (antes Twitter), donde compartiremos hilos sobre la magia blanca y negra. Con un enfoque respetuoso y reflexivo, nuestro objetivo será comprender y visibilizar el trasfondo cultural de la brujería popular. Buscaremos promover el diálogo abierto y contribuir a romper los estigmas que existen en torno a estas prácticas.
            </p>
          </div>

          {/* Segundo div */}
          <div className="flex flex-row-reverse items-center gap-8 mb-16">
            <div className="w-[40%] flex flex-col items-center">
              <div className="relative w-[80%] aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/images/documental.png"
                  alt="Documental"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mt-4">Entre Sombras y Luces</h3>
            </div>
            <p className="w-[60%] text-lg text-white/80 text-justify">
              Tendremos una serie de cuatro capítulos titulados: &ldquo;El reflejo de la mente&rdquo;, &ldquo;La voz de la quebrada&rdquo;, &ldquo;El juego del péndulo&rdquo; y &ldquo;El daño invisible&rdquo;. Este podcast te llevará a los rincones más profundos y oscuros del misterio, explorando experiencias reales y creencias que desafían la lógica, pero que forman parte de nuestra memoria colectiva.
            </p>
          </div>

          {/* Tercer div */}
          <div className="flex items-center gap-8 mb-16">
            <div className="w-[40%] flex flex-col items-center">
              <div className="relative w-[80%] aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/images/podcast.png"
                  alt="Fotolibro"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mt-4">Susurros de una Sombra</h3>
            </div>
            <p className="w-[60%] text-lg text-white/80 text-justify">
              Tendremos una serie de cuatro capítulos: &ldquo;El reflejo de la mente&rdquo;, &ldquo;La voz de la quebrada&rdquo;, &ldquo;El juego del péndulo&rdquo; y &ldquo;El daño invisible&rdquo;. Este podcast te sumerge en los rincones más profundos y oscuros del misterio, explorando experiencias reales y creencias que desafían la lógica, pero que forman parte de nuestra memoria colectiva.
            </p>
          </div>

          {/* Cuarto div */}
          <div className="flex flex-row-reverse items-center gap-8 mb-16">
            <div className="w-[40%] flex flex-col items-center">
              <div className="relative w-[80%] aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/images/comic.png"
                  alt="Website"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mt-4">El útimo Conjuro</h3>
            </div>
            <p className="w-[60%] text-lg text-white/80 text-justify">
              Contaremos con un cómic animado que narra la historia de Julia, una bruja buena traicionada por su aquelarre, y su nieto Lucas, quien deberá enfrentar su legado mágico y decidir si rompe la maldición que amenaza con repetirse 
            </p>
          </div>

          {/* Quinto div */}
          <div className="flex items-center gap-8">
            <div className="w-[40%] flex flex-col items-center">
              <div className="relative w-[80%] aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/images/videojuego.png"
                  alt="Redes Sociales"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mt-4">Bruji Aventuras</h3>
            </div>
            <p className="w-[60%] text-lg text-white/80 text-justify">
              Presentamos &ldquo;Bruji Aventuras&rdquo;, un juego interactivo donde los jugadores completan misiones mágicas, y sus decisiones los llevan a un resultado exitoso o a divertidas sorpresas si eligen el camino equivocado.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}