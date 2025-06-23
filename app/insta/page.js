'use client'
import Link from 'next/link';
import Image from 'next/image';

export default function InstaPage() {
    return (
        <div 
            className="min-h-screen w-full flex flex-col bg-black relative"
            style={{
                backgroundImage: "url('/images/smoke-conocenos.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Link 
                href="/"
                className="px-6 py-2 bg-black text-white font-semibold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2 absolute top-10 left-10" 
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

            <div className="w-full max-w-7xl mx-auto px-8 py-12 mt-12 flex items-center justify-between">
                {/* Left side content */}
                <div className="w-1/2 space-y-8">
                    <h1 className="text-5xl text-white font-bold">
                        Nuesra Red Social <br/> Instagram
                    </h1>
                    <a 
                        href="https://www.instagram.com/entre.sombrasyluces/?igsh=MWdsZW85a2Z0Z2k2Mw%3D%3D#"
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

                {/* Right side image */}
                <div className="w-1/2 relative flex items-center justify-center">
                    <div className="relative w-[40%] aspect-square"> {/* Reduced from 80% */}
                        <Image
                            src="/images/LOGOsilvia.png"
                            alt="Logo Silvia"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* New section with three interactive images */}
            <div className="image-grid w-full max-w-7xl mx-auto px-8 py-8 -mt-4 flex justify-center items-start gap-8">
                <a 
                    href="https://www.instagram.com/p/DJhqIblPIW-/?igsh=MTB6enZ5ejkzangwcg==" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-[300px] transition-all duration-300 hover:scale-110 hover:z-10 group" // Removed fixed height
                >
                    <Image
                        src="/images/insta1.webp"
                        alt="Instagram content 1"
                        width={300}
                        height={0}
                        className="object-contain rounded-lg w-full"
                        style={{ height: 'auto' }} // Let height adjust automatically
                    />
                </a>
                <a 
                    href="https://www.instagram.com/p/DJmfMV_O_J4/?igsh=MXNzcWV3M2dsYnQwYw==" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-[300px] transition-all duration-300 hover:scale-110 hover:z-10 group"
                >
                    <Image
                        src="/images/insta2.webp"
                        alt="Instagram content 2"
                        width={300}
                        height={0}
                        className="object-contain rounded-lg w-full"
                        style={{ height: 'auto' }}
                    />
                </a>
                <a 
                    href="https://www.instagram.com/p/DJj6ZKROhG2/?utm_source=ig_web_button_share_sheet" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-[300px] transition-all duration-300 hover:scale-110 hover:z-10 group"
                >
                    <Image
                        src="/images/insta3.webp"
                        alt="Instagram content 3"
                        width={300}
                        height={0}
                        className="object-contain rounded-lg w-full"
                        style={{ height: 'auto' }}
                    />
                </a>
            </div>

            {/* Actualizamos los estilos globales */}
            <style jsx global>{`
                .image-grid:hover a:not(:hover) {
                    transform: scale(0.95);
                    filter: brightness(0.7);
                }
                
                .image-grid a {
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
}