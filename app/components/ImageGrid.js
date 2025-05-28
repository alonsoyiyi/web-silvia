'use client';
import Image from 'next/image';

const ImageGrid = () => {
  const images = [
    { 
      src: '/images/preciooscuro.webp', 
      alt: 'Precio Oscuro',
      url: 'https://x.com/entre_miedoyfe/status/1923796094552621060?s=46'
    },
    { 
      src: '/images/cuyhuevo.webp', 
      alt: 'Cuy Huevo',
      url: 'https://x.com/entre_miedoyfe/status/1926333649458184377?s=46'
    },
    { 
      src: '/images/balanza.webp', 
      alt: 'Balanza',
      url: 'https://x.com/entre_miedoyfe/status/1924883267452342596?s=46'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-12">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="relative h-[500px] overflow-visible rounded-lg group z-10 hover:z-20 cursor-pointer"
          onClick={() => window.open(image.url, '_blank', 'noopener,noreferrer')}
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
  );
};

export default ImageGrid;