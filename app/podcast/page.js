import Image from 'next/image';
import Link from 'next/link';

export default function DocumentalPage() {
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

    
      {/* Segunda sección - Imágenes interactivas */}
      <div className="w-full bg-black -mt-28">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-12"> {/* Increased gap for scaling space */}
          {[
            { src: '/images/preciooscuro.webp', alt: 'Precio Oscuro' },
            { src: '/images/cuyhuevo.webp', alt: 'Cuy Huevo' },
            { src: '/images/balanza.webp', alt: 'Balanza' }
          ].map((image, index) => (
            <div 
              key={index} 
              className="relative h-[500px] overflow-visible rounded-lg group z-10 hover:z-20" // Changed overflow to visible and added z-index handling
            >
              <div className="absolute inset-0 transition-all duration-500 transform-gpu group-hover:scale-120">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain transition-all duration-500 group-hover:brightness-[1.3]"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}