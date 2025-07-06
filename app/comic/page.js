import Image from 'next/image';
import Link from 'next/link';

export default function ComicPage() {
  return (
    <main 
      className="min-h-screen w-full flex flex-col"
      style={{
        backgroundImage: "url('/images/logo-comic.webp')",
        backgroundSize: '100% auto', // Cambiado de 'cover' a '100% auto'
        backgroundPosition: 'top center', // Cambiado de 'center' a 'top center'
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black'
      }}
    >
      {/* Contenedor principal con padding ajustado */}
      <div className="w-full flex flex-col px-20 pt-12 pb-12"> {/* Aumentado pt-8 a pt-12 */}
        {/* Botón volver */}
        <div className="w-full mb-12">
          <Link
            href="/"
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

        {/* Contenido central */}
        <div className="flex flex-col items-start gap-8 text-white mb-60">
          <h1 className="text-6xl text-left">
            El último <br /> Conjuro
          </h1>
<a
            href="https://www.webtoons.com/en/canvas/el-%C3%BAltimo-conjuro-/list?title_no=1062892"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1 bg-white text-black rounded-full hover:scale-105 transition-transform text-lg cursor-pointer"
          >
            <Image
              src="/images/webtoon-icon.svg"
              alt="Instagram icon"
              width={32}
              height={32}
              className="brightness-0"
            />
            Ver más
          </a>
        </div>

        {/* Texto inferior */}
        <div className="text-white w-full mb-16">
          <h2 className="text-3xl mb-4 text-left">Nuestro Comic</h2>
          <p className="text-l text-left whitespace-nowrap overflow-hidden text-ellipsis">
            Una historia interactiva donde cada decisión revela nuevos misterios y secretos ocultos.
          </p>
        </div>

        {/* Sección de capítulos */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto">
            <div className="relative h-[400px] flex items-center justify-center">
              {/* Capítulo 1 */}
              <div className="absolute transform -translate-x-[100%] -rotate-6"> {/* Cambiado de -60% a -80% */}
                <Link href="https://www.webtoons.com/en/canvas/el-%C3%BAltimo-conjuro-/capitulo-1-/viewer?title_no=1062892&episode_no=1" className="relative block group">
                  <div className="relative w-[300px] h-[400px] transition-all duration-500 group-hover:scale-105">
                    <Image
                      src="/images/comic-cards.webp"
                      alt="Capítulo 1"
                      fill
                      className="object-cover rounded-lg transition-all duration-500 group-hover:brightness-100 brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50">
                      <h3 className="text-white text-3xl font-bold">Capítulo 1</h3>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Capítulo 2 (Central) */}
              <div className="relative z-10">
                <Link href="https://www.webtoons.com/en/canvas/el-%C3%BAltimo-conjuro-/capitulo-2/viewer?title_no=1062892&episode_no=2" className="relative block group">
                  <div className="relative w-[300px] h-[400px] transition-all duration-500 group-hover:scale-105">
                    <Image
                      src="/images/comic-cards.webp"
                      alt="Capítulo 2"
                      fill
                      className="object-cover rounded-lg transition-all duration-500 group-hover:brightness-100 brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50">
                      <h3 className="text-white text-3xl font-bold">Capítulo 2</h3>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Capítulo 3 */}
              <div className="absolute transform translate-x-[100%] rotate-6"> {/* Cambiado de 60% a 80% */}
                <Link href="https://www.webtoons.com/en/canvas/el-%C3%BAltimo-conjuro-/capitulo-3/viewer?title_no=1062892&episode_no=3" className="relative block group">
                  <div className="relative w-[300px] h-[400px] transition-all duration-500 group-hover:scale-105">
                    <Image
                      src="/images/comic-cards.webp"
                      alt="Capítulo 3"
                      fill
                      className="object-cover rounded-lg transition-all duration-500 group-hover:brightness-100 brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50">
                      <h3 className="text-white text-3xl font-bold">Capítulo 3</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}