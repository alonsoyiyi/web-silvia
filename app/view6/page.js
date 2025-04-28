import Image from 'next/image';
import Link from 'next/link';

export default function View6() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-10 gap-8">
      <div className="w-full flex items-center justify-center relative">
        <Link 
          href="/"
          className="absolute left-10 px-6 py-2 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
        >
          Volver
        </Link>
        <h1 className="text-4xl font-bold text-center">Vista 6</h1>
      </div>
      <div className="relative w-[80%] h-[60vh] max-w-5xl">
        <Image
          src="/images/section6.png"
          alt="Sección 6"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}