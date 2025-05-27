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
  const audioRef = useRef(null);

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
            Sussuros <br /> de una Sombra
          </h1>

          <button className="px-4 py-1 bg-white text-black rounded-full hover:scale-105 transition-transform text-lg flex items-center gap-2">
            <Image
              src="/images/videoY.svg"
              alt="Video icon"
              width={32}
              height={32}
              className="brightness-0" // Makes the SVG black to match text
            />
            Ver más
          </button>
        </div>

        {/* Texto inferior - moved up and made single line */}
        <div className="text-white w-full mt-auto mb-28">
          <h2 className="text-3xl  mb-4 text-left">Nuestros Podcast</h2>
          <p className="text-l text-left whitespace-nowrap overflow-hidden text-ellipsis">
           Historias reales de personas que aseguran haber tenido un encuentro cercano con la brujería. 
          </p>
        </div>
      </div>

      {/* Segunda sección - Reproductor de Audio */}
      <div className="w-full bg-black py-12 px-4">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-6 shadow-2xl">
          {/* Player */}
          <div className="flex items-center gap-6">
            {/* Imagen actual */}
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src={currentTrack.image}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Información y controles */}
            <div className="flex-1">
              <h3 className="text-white text-xl font-semibold">{currentTrack.title}</h3>
              <p className="text-gray-400">{currentTrack.author}</p>
              
              {/* Controles */}
              <div className="flex items-center gap-4 mt-4">
                <button onClick={handlePrev}>
                  <IoPlaySkipBack className="text-white text-2xl" />
                </button>
                <button onClick={togglePlay} className="focus:outline-none">
                  {isPlaying ? (
                    <IoPauseCircle className="text-white text-5xl" />
                  ) : (
                    <IoPlayCircle className="text-white text-5xl" />
                  )}
                </button>
                <button onClick={handleNext}>
                  <IoPlaySkipForward className="text-white text-2xl" />
                </button>

                {/* Control de volumen */}
                <div className="flex items-center gap-2 ml-6">
                  <IoVolumeHigh className="text-white text-xl" />
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
                    className="w-24"
                  />
                </div>

                {/* Botón de playlist */}
                <button 
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className="ml-auto"
                >
                  <IoMdList className="text-white text-2xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Playlist */}
          {showPlaylist && (
            <div className="mt-6 border-t border-gray-700 pt-4">
              {podcastList.map((track) => (
                <div
                  key={track.id}
                  onClick={() => setCurrentTrack(track)}
                  className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-800 ${
                    currentTrack.id === track.id ? 'bg-gray-800' : ''
                  }`}
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
    </main>
  );
}