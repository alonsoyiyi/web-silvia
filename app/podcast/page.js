'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { IoPlayCircle, IoPauseCircle, IoPlaySkipForward, IoPlaySkipBack, IoVolumeHigh } from 'react-icons/io5';
import { IoMdList } from 'react-icons/io';

// Lista de podcasts
const podcastList = [
  {
    id: 1,
    title: "Fe y Escepticismo",
    author: "Susurros de una Sombra",
    duration: "04:09",
    image: "/images/cuyhuevo.webp",
    audioSrc: "/audios/fe-escepticismo.mp3"
  },
  {
    id: 2,
    title: "El amuleto de los lamentos",
    author: "Susurros de una Sombra",
    duration: "28:15",
    image: "/images/cuyhuevo.webp",
    audioSrc: "/audios/fe-escepticismo.mp3"
  },
  {
    id: 3,
    title: "La voz de la quebrada",
    author: "Susurros de una Sombra",
    duration: "28:15",
    image: "/images/cuyhuevo.webp",
    audioSrc: "/audios/fe-escepticismo.mp3"
  },
  {
    id: 4,
    title: "El Juego del Péndulo",
    author: "Susurros de una Sombra",
    duration: "28:15",
    image: "/images/cuyhuevo.webp",
    audioSrc: "/audios/fe-escepticismo.mp3"
  }
  ,
  {
    id: 5,
    title: "El daño Invisible",
    author: "Susurros de una Sombra",
    duration: "28:15",
    image: "/images/cuyhuevo.webp",
    audioSrc: "/audios/fe-escepticismo.mp3"
  }
];

export default function PodcastPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(podcastList[0]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volume, setVolume] = useState(1);
  const [randomPositions, setRandomPositions] = useState({});
  const audioRef = useRef(null);

  // Generar posiciones aleatorias solo una vez al montar el componente
  useEffect(() => {
    const positions = {};
    const totalCards = podcastList.length;
    const arcAngle = 45; // Ángulo total del arco
    const angleStep = arcAngle / (totalCards - 1);
    const spreadWidth = 100; // Ancho de dispersión en porcentaje

    podcastList.forEach((track, index) => {
      const currentAngle = -arcAngle / 2 + (angleStep * index);
      // Calculamos un offset horizontal aleatorio para cada carta
      const baseOffset = (index - (totalCards - 1) / 2) * (spreadWidth / totalCards);

      positions[track.id] = {
        rotate: currentAngle,
        x: baseOffset + Math.sin(currentAngle * Math.PI / 180) * 80, // Aumentamos dispersión horizontal
        y: -Math.abs(Math.cos(currentAngle * Math.PI / 180) * 5), // Ligera curva hacia arriba
        originX: baseOffset * 0.2 // Punto de origen variable para cada carta
      };
    });
    setRandomPositions(positions);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = podcastList.findIndex(track => track.id === currentTrack.id);
    const nextTrack = podcastList[(currentIndex + 1) % podcastList.length];
    setCurrentTrack(nextTrack);
  };

  const handlePrev = () => {
    const currentIndex = podcastList.findIndex(track => track.id === currentTrack.id);
    const prevTrack = podcastList[(currentIndex - 1 + podcastList.length) % podcastList.length];
    setCurrentTrack(prevTrack);
  };

  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Primera sección - Hero */}
      <div
        className="w-full aspect-[16/9] relative flex flex-col items-start py-12 px-20" // reduced py-20 to py-12
        style={{
          backgroundImage: "url('/images/fondopodcast.webp')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'black'
        }}
      >
        {/* Botón volver - moved up */}
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
              className="brightness-0 invert" // Makes the SVG white to match text
            />
            Volver
          </Link>
        </div>

        {/* Contenido central - moved up */}
        <div className="flex flex-col items-start gap-8 text-white mt-16">
          <h1 className="text-6xl text-left">
            Susurros <br /> de una Sombra
          </h1>
          <a
            href="https://open.spotify.com/show/6cO1hkwaPKzvqLKh5hdcEQ?si=cXL4dYHTTHmaXGRXyqBwTw"
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

        {/* Texto inferior - moved up and made single line */}
        <div className="text-white w-full mt-auto mb-28">
          <h2 className="text-3xl  mb-4 text-left">Nuestros Podcast</h2>
          <p className="text-l text-left whitespace-nowrap overflow-hidden text-ellipsis">
            Historias reales de personas que aseguran haber tenido un encuentro cercano con la brujería.
          </p>
        </div>
      </div>

      {/* Sección de cartas dispersas */}
      <div className="w-full bg-black relative min-h-[600px] flex flex-col -mt-16">
        <div className="relative flex-1 overflow-visible">
          <div className="absolute left-1/2 bottom-0 w-full max-w-4xl h-[400px] -translate-x-1/2"> {/* Reducido height de 500px a 400px */}
            {podcastList.map((track) => {
              const isPlaying = track.id === currentTrack.id;
              const pos = randomPositions[track.id] || { x: 0, y: 0, rotate: 0, originX: 0 };

              return (
                <div
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(track);
                    setIsPlaying(true);
                  }}
                  className={`
                    absolute
                    transition-all duration-700 cursor-pointer
                    origin-bottom
                    ${isPlaying ? 'z-50' : 'hover:z-40'}
                  `}
                  style={{
                    left: `calc(50% + ${pos.originX}%)`,
                    transform: isPlaying
                      ? `translate(calc(-50% + ${pos.x}%), -15%) rotate(0deg) scale(1.05)` // Mantiene posición X, menos elevación Y
                      : `translate(calc(-50% + ${pos.x}%), ${pos.y}%) rotate(${pos.rotate}deg) scale(1)`,
                    transformOrigin: 'bottom center',
                    zIndex: isPlaying ? 50 : track.id
                  }}
                >
                  <div className={`
                    relative w-[250px] h-[350px] rounded-lg overflow-hidden
                    transition-transform duration-500
                    ${isPlaying ? '' : 'hover:scale-105'}
                    shadow-xl
                  `}>
                    <Image
                      src={track.image}
                      alt={track.title}
                      fill
                      className={`
                        object-cover
                        transition-all duration-500
                        ${isPlaying ? 'brightness-100' : 'brightness-75'}
                      `}
                      priority={isPlaying}
                    />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                        <h3 className="text-xl font-bold mb-2">{track.title}</h3>
                        <p className="text-sm opacity-75">{track.author}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reproductor de Audio */}
        <div className="w-full bg-black py-4 px-4"> {/* Reducido py-8 a py-4 */}
          <div className="max-w-4xl mx-auto bg-[#c2c2c2] rounded-lg p-4 shadow-2xl">
            {/* Player Container */}
            <div className="flex items-center justify-between gap-4"> {/* Reduced gap */}
              {/* Controles izquierdos */}
              <div className="flex items-center gap-3">
                {/* Controles izquierdos con iconos más pequeños */}
                <button onClick={handlePrev}>
                  <IoPlaySkipBack className="text-black text-xl hover:opacity-70" />
                </button>
                <button onClick={togglePlay} className="focus:outline-none">
                  {isPlaying ? (
                    <IoPauseCircle className="text-black text-4xl hover:opacity-70" />
                  ) : (
                    <IoPlayCircle className="text-black text-4xl hover:opacity-70" />
                  )}
                </button>
                <button onClick={handleNext}>
                  <IoPlaySkipForward className="text-black text-xl hover:opacity-70" />
                </button>
              </div>

              {/* Información central */}
              <div className="flex-1 bg-[#313131] rounded-lg px-4 py-2 flex items-center gap-3"> {/* Reduced padding and gap */}
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"> {/* Reduced size */}
                  <Image
                    src={currentTrack.image}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">{currentTrack.title}</h3> {/* Reduced text size */}
                  <p className="text-gray-300 text-xs">{currentTrack.author}</p> {/* Reduced text size */}
                </div>
                <span className="text-white text-xs">{currentTrack.duration}</span> {/* Reduced text size */}
              </div>

              {/* Controles derechos */}
              <div className="flex items-center gap-4"> {/* Reduced gap */}
                <div className="flex items-center gap-2">
                  <IoVolumeHigh className="text-black text-lg" /> {/* Reduced icon size */}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => {
                      setVolume(e.target.value);
                      audioRef.current.volume = e.target.value;
                    }}
                    className="w-20"
                  />
                </div>
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className="hover:opacity-70"
                >
                  <IoMdList className="text-black text-xl" /> {/* Reduced icon size */}
                </button>
              </div>
            </div>

            {/* Playlist Modal */}
            {showPlaylist && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-[#313131] rounded-xl p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white text-xl font-semibold">Lista de Reproducción</h3>
                    <button
                      onClick={() => setShowPlaylist(false)}
                      className="text-white hover:opacity-70"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {podcastList.map((track) => (
                      <div
                        key={track.id}
                        onClick={() => {
                          setCurrentTrack(track);
                          setShowPlaylist(false);
                          setIsPlaying(true);
                        }}
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors
                          ${currentTrack.id === track.id ? 'bg-gray-700' : ''}`}
                      >
                        <Image
                          src={track.image}
                          alt={track.title}
                          width={48}
                          height={48}
                          className="rounded"
                        />
                        <div>
                          <p className="text-white">{track.title}</p>
                          <p className="text-gray-400 text-sm">{track.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Audio element */}
            <audio
              ref={audioRef}
              src={currentTrack.audioSrc}
              onEnded={handleNext}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </main>
  );
}