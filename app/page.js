'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from './components/Carousel';
import '../app/styles.css';

export default function Home() {
  const [currentBgImage, setCurrentBgImage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollToCarousel = () => {
    setIsTransitioning(true);
    
    // Esperar un frame para que la transición se active
    requestAnimationFrame(() => {
      const transitionElement = document.querySelector('.smoke-transition');
      transitionElement?.classList.add('fadein');
      
      setTimeout(() => {
        const carouselSection = document.querySelector('.content-section');
        carouselSection?.scrollIntoView({ behavior: 'smooth' });
        
        // Comenzar fade out cuando el video está por terminar
        setTimeout(() => {
          transitionElement?.classList.remove('fadein');
          transitionElement?.classList.add('fadeout');
          
          // Remover la transición después del fade out
          setTimeout(() => {
            setIsTransitioning(false);
          }, 1000);
        }, 500);
      }, 1000);
    });
  };

  return (
    <main className="main-container">
      {/* Overlay de transición con humo */}
      {isTransitioning && (
        <div className={`smoke-transition ${isTransitioning ? 'active' : ''}`}>
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/smoke-transition2.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <div className="video-section relative">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full z-50 px-8 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo - aumentado de w-40 a w-48 */}
            <div className="relative w-48 h-20">
              <Image
                src="/images/logohome.png"
                alt="Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>

            {/* Links - ajustando tamaño y posición */}
            <div className="w-2/3 flex items-center justify-between"> {/* Cambiado de justify-end y eliminado gap-20 */}
              <Link 
                href="/proyectoT" 
                className="text-white hover:text-gray-300 transition-colors text-2xl"
              >
                Proyecto Transmedial
              </Link>
              <Link 
                href="/documental" 
                className="text-white hover:text-gray-300 transition-colors text-2xl"
              >
                Documental
              </Link>
              <Link 
                href="/sobrenosotros" 
                className="text-white hover:text-gray-300 transition-colors text-2xl"
              >
                Sobre Nosotros
              </Link>
              <Link 
                href="/insta" 
                className="text-white hover:text-gray-300 transition-colors text-2xl"
              >Instagram
                
              </Link>
            </div>
          </div>

          {/* Línea divisoria - ajustada para coincidir con el contenido */}
          <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-white/50 mx-auto" 
               style={{ 
                 width: 'calc(100% - 4rem)',
                 maxWidth: '80rem' /* equivalente a max-w-7xl */
               }} 
          />
        </nav>

        {/* Botón de scroll con SVG */}
        <button 
          onClick={scrollToCarousel}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 cursor-pointer transition-transform hover:scale-110"
        >
          <Image
            src="/images/arrow.svg"
            alt="Scroll to carousel"
            width={80}
            height={80}
            className="rotate-90 brightness-0 invert" // Rotación y color blanco
            style={{
              filter: 'brightness(0) invert(1)', // Asegura color blanco en Safari
            }}
          />
        </button>

        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/videos/fondo2.mp4" type="video/mp4" />
        </video>
      </div>

      <div 
        className="content-section relative flex flex-col items-center justify-center py-12" // cambiado de py-20 a py-12
      >
        {/* Fondo dinámico */}
        <div 
          className="absolute inset-0 w-full h-full opacity-50 transition-all duration-700"
          style={{
            backgroundImage: `url(${currentBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 0.7s ease-in-out'
          }}
        />
        
        {/* Título - reducido el margen inferior de mb-12 a mb-8 */}
        <h2 className="text-4xl font-bold text-white mb-8 relative z-10">
          BRAZOS TRANSMEDIALES
        </h2>
        
        {/* Contenido del carrusel */}
        <div id="slider-section">
          <section className="slider-section w-full max-w-7xl mx-auto relative z-10">
            <Carousel onSlideChange={setCurrentBgImage} />
          </section>
        </div>
      </div>
    </main>
  );
}