"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Crear el elemento de audio cuando el componente se monte
    const audioElement = new Audio('/audio/faraway.mp3');
    audioElement.loop = true;
    audioElement.volume = 0.2; // Añadido: establece el volumen
    setAudio(audioElement);

    // Cleanup cuando el componente se desmonte
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-8 right-8 z-50 p-4 bg-black/20 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
      aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
    >
      <Image
        src={isPlaying ? '/images/pausem.svg' : '/images/playm.svg'}
        alt={isPlaying ? 'Pausar' : 'Reproducir'}
        width={24}
        height={24}
        className="brightness-0 invert"
      />
    </button>
  );
}