import Image from 'next/image';
import Link from 'next/link';

export default function DocumentalPage() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Primera sección - Hero */}
      <div
        className="w-full aspect-[16/9] relative flex flex-col items-start py-12 px-20" // reduced py-20 to py-12
        style={{
          backgroundImage: "url('/images/fondojuego2.webp')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'black'
        }}
      >
        {/* Botón volver - moved up */}
        <div className="w-full -mt-4">
          <Link
            href="/#slider-section"
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

        {/* Contenido central - moved up */}
        <div className="flex flex-col items-start gap-8 text-white mt-16">
          <h1 className="text-6xl text-left">
            Bruji <br /> Aventuras
          </h1>
          <a
            href="https://brujiaventuras-j6jg.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1 bg-white text-black rounded-full hover:scale-105 transition-transform text-lg cursor-pointer"
          >
            <Image
              src="/images/videogame.svg"
              alt="game icon"
              width={32}
              height={32}
              className="brightness-0"
            />
            Ver más
          </a>
        </div>

        {/* Texto inferior - moved up and made single line */}
        <div className="text-white w-full mt-auto mb-28">
          <h2 className="text-3xl  mb-4 text-left">Nuestro Videojuego</h2>
          <p className="text-l text-left whitespace-nowrap overflow-hidden text-ellipsis">
            Juego interactivo donde tus decisiones mágicas llevan al éxito o a divertidas sorpresas.
          </p>
        </div>
      </div>

      {/* Nueva sección - Imagen del juego */}
      <div
        className="w-full bg-black -mt-28"
        style={{
          backgroundImage: "url('/images/fondojuegob.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <Link
            href="https://brujiaventuras-j6jg.vercel.app/"
            className="block relative h-[600px] w-full hover:scale-105 transition-all duration-500"
          >
            <Image
              src="/images/bruji-juego.webp"
              alt="Bruji Aventuras - Juego"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>
      </div>

    </main>
  );
}