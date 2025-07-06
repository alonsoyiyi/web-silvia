'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const carouselData = [
    {
        title: "PODCAST",
        content: "-Susurros de una Noche",
        link: "/podcast",
        bgImage: "/images/podcast.png"
    },
    {
        title: "BLOG",
        content: "-Entre el Miedo y la Fe",
        link: "/blog",
        bgImage: "/images/blog.png"
    },
    {
        title: "DOCUMENTAL",
        content: "-Entre Sombras y Luces",
        link: "/documental",
        bgImage: "/images/documental.png"
    },
    {
        title: "CÓMIC",
        content: "-El último Conjuro",
        link: "/comic",
        bgImage: "/images/comic.png"
    },
    
    {
        title: "VIDEOJUEGO",
        content: "-Bruji Aventuras",
        link: "/videojuego",
        bgImage: "/images/videojuego.png"
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

// Modificar las variantes del contenido
const contentVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        x: direction > 0 ? -50 : 50,
        opacity: 0
    })
};

export default function Carousel({ onSlideChange }) {
    const [currentIndex, setCurrentIndex] = useState(2); // Comenzar desde el índice 2 para tener dos slides a cada lado
    const [direction, setDirection] = useState(0);

    const getVisibleIndices = () => {
        const indices = [];
        const totalSlides = carouselData.length;
        
        // Obtener los 5 índices (-2, -1, 0, 1, 2 relativos al índice actual)
        for (let i = -2; i <= 2; i++) {
            let index = currentIndex + i;
            
            // Manejo circular del índice
            if (index < 0) {
                index = totalSlides + index;
            } else if (index >= totalSlides) {
                index = index % totalSlides;
            }
            
            indices.push(index);
        }
        
        return indices;
    };

    useEffect(() => {
        onSlideChange(carouselData[currentIndex].bgImage);
    }, [currentIndex, onSlideChange]);

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex(prevIndex => 
            prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full h-[85vh] overflow-visible mx-auto max-w-[95%]" style={{ perspective: '2000px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Slides */}
                <AnimatePresence initial={false}>
                    {getVisibleIndices().map((itemIndex, arrayIndex) => {
                        const position = arrayIndex - 2;
                        return (
                            <motion.div
                                key={`slide-${itemIndex}-${direction}`}
                                custom={{ direction, position }}
                                data-pos={position}
                                style={{
                                    position: 'absolute',
                                    width: '350px',
                                    height: '500px',
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
                                <div className="relative w-full h-full rounded-lg overflow-hidden">
                                    <Image
                                        src={carouselData[itemIndex].bgImage}
                                        alt={carouselData[itemIndex].title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        priority={position === 0}
                                    />
                                    {position === 0 ? (
                                        // Link solo para el slide central
                                        <Link
                                            href={carouselData[itemIndex].link}
                                            className="absolute inset-0 z-20"
                                        />
                                    ) : (
                                        // Div clickeable para navegación en slides laterales
                                        <div 
                                            className="absolute inset-0 z-20 cursor-pointer"
                                            onClick={() => position < 0 ? handlePrev() : handleNext()}
                                        />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Texto Flotante */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={`content-${currentIndex}`}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] z-50" // Changed from w-screen max-w-[1200px] to w-[800px]
                    >
                        <Link href={carouselData[currentIndex].link} className="block">
                            <div className="text-white text-center cursor-pointer hover:scale-105 transition-transform">
                                <h2 className="text-8xl font-bold mb-8 text-white drop-shadow-lg pointer-events-none">
                                    {carouselData[currentIndex].title}
                                </h2>
                                <p className="text-3xl text-white drop-shadow-lg mx-auto pointer-events-none">
                                    {carouselData[currentIndex].content}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Botones de navegación */}
            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 z-10 bg-black/30 p-4 rounded-full hover:bg-black/50 transition-colors"
            >
                <Image
                    src="/images/arrow.svg"
                    alt="Previous"
                    width={60}
                    height={60}
                    className="rotate-[180deg] brightness-0 invert"
                    style={{
                        filter: 'brightness(0) invert(1)',
                    }}
                />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 z-10 bg-black/30 p-4 rounded-full hover:bg-black/50 transition-colors"
            >
                <Image
                    src="/images/arrow.svg"
                    alt="Next"
                    width={60}
                    height={60}
                    className="rotate-0 brightness-0 invert"
                    style={{
                        filter: 'brightness(0) invert(1)',
                    }}
                />
            </button>
        </div>
    );
}