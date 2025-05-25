'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const carouselData = [
    {
        title: "PODCAST",
        content: "-Susurros de una Noche",
        link: "/view1",
        bgImage: "/images/podcast.png"
    },
    {
        title: "BLOG",
        content: "-Entre el Miedo y la Fe",
        link: "/view2",
        bgImage: "/images/blog.png"
    },
    {
        title: "CÓMIC",
        content: "-El último Conjuro",
        link: "/view3",
        bgImage: "/images/comic.png"
    },
    {
        title: "DOCUMENTAL",
        content: "-Entre Sombras y Luces",
        link: "/view4",
        bgImage: "/images/documental.png"
    },
    {
        title: "VIDEOJUEGO",
        content: "-Bruji Aventuras",
        link: "/view5",
        bgImage: "/images/videojuego.png"
    }
];

const slideVariants = {
    enter: (custom) => ({
        x: custom.direction > 0 ? '110%' : '-110%',
        scale: 0.7,
        opacity: 1,
        zIndex: 0
    }),
    center: (custom) => {
        switch (custom.position) {
            case 0:
                return {
                    x: '0%',
                    scale: 1,
                    opacity: 1,
                    zIndex: 5
                };
            case -1:
                return {
                    x: '-60%',
                    scale: 0.85,
                    opacity: 1,
                    zIndex: 4
                };
            case 1:
                return {
                    x: '60%',
                    scale: 0.85,
                    opacity: 1,
                    zIndex: 4
                };
            case -2:
                return {
                    x: '-110%',
                    scale: 0.7,
                    opacity: 1,
                    zIndex: 3
                };
            case 2:
                return {
                    x: '110%',
                    scale: 0.7,
                    opacity: 1,
                    zIndex: 3
                };
            default:
                return {
                    x: '0%',
                    scale: 1,
                    opacity: 1,
                    zIndex: 1
                };
        }
    },
    exit: (custom) => ({
        x: custom.direction > 0 ? '-110%' : '110%',
        scale: 0.7,
        opacity: 1,
        zIndex: 0
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
        <div className="relative w-full h-[85vh] overflow-visible mx-auto max-w-[95%]">
            <div className="absolute inset-0 flex items-center justify-center perspective-300">
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
                                    <AnimatePresence mode="wait" initial={false}>
                                        {position === 0 && (
                                            <motion.div
                                                key={`content-${itemIndex}-${direction}`}
                                                custom={direction}
                                                variants={contentVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.3 }}
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
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

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