'use client';
import { useState } from 'react';
import Carousel from './components/Carousel';
import '../app/styles.css';

export default function Home() {
  const [currentBgImage, setCurrentBgImage] = useState('');

  return (
    <main className="main-container">
      <div className="video-section">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/videos/fondo1.mp4" type="video/mp4" />
        </video>
      </div>

      <div 
        className="content-section relative flex items-center justify-center py-20"
      >
        {/* Fondo dinámico */}
        <div 
          className="absolute inset-0 w-full h-full opacity-50 transition-all duration-300"
          style={{
            backgroundImage: `url(${currentBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Contenido del carrusel */}
        <section className="slider-section w-full max-w-7xl mx-auto relative z-10">
          <Carousel onSlideChange={setCurrentBgImage} />
        </section>
      </div>
    </main>
  );
}