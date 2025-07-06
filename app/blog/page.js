import Image from 'next/image';
import Link from 'next/link';
import ImageGrid from '../components/ImageGrid';

export default function DocumentalPage() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Primera sección - Hero */}
      <div
        className="w-full aspect-[16/9] relative flex flex-col items-start py-12 px-20" // reduced py-20 to py-12
        style={{
          backgroundImage: "url('/images/fondotwiter.webp')",
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
            Entre el Miedo <br /> y la Fe
          </h1>

          <Link 
            href="https://x.com/entre_miedoyfe?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 bg-white text-black rounded-full hover:scale-105 transition-transform text-lg flex items-center gap-2"
          >
            <Image
              src="/images/x-social.svg"
              alt="X icon"
              width={32}
              height={32}
              className="brightness-0"
            />
            Ver más
          </Link>
        </div>

        {/* Texto inferior - moved up and made single line */}
        <div className="text-white w-full mt-auto mb-28">
          <h2 className="text-3xl  mb-4 text-left">Nuestros Hilos</h2>
          <p className="text-l text-left whitespace-nowrap overflow-hidden text-ellipsis">
           Exploramos mitos, verdades y significados de la brujería.
          </p>
        </div>
      </div>

    
      {/* Segunda sección - Imágenes interactivas */}
      <div className="w-full bg-black -mt-28">
        <ImageGrid />
      </div>

    </main>
  );
}