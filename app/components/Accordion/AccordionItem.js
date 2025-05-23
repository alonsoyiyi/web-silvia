import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AccordionItem({ 
  title, 
  content, 
  link, 
  bgImage,
  mobileProps 
}) {
  const titleControls = useAnimation();
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Efecto original para PC
  useEffect(() => {
    let timer;
    if (isFullyExpanded) {
      timer = setTimeout(() => {
        setShowContent(true);
      }, 400);
    } else {
      setShowContent(false);
    }
    return () => clearTimeout(timer);
  }, [isFullyExpanded]);

  // Nuevo efecto para móvil
  useEffect(() => {
    if (mobileProps) {
      let timer;
      if (mobileProps.isActive) {
        timer = setTimeout(() => {
          setShowContent(true);
        }, 400);
      } else {
        setShowContent(false);
      }
      return () => clearTimeout(timer);
    }
  }, [mobileProps?.isActive]);

  // Original PC handlers
  const handleHover = async () => {
    if (!mobileProps) {
      titleControls.start({
        top: '15%',
        rotate: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      });
    }
  };

  const handleHoverEnd = () => {
    if (!mobileProps) {
      setIsFullyExpanded(false);
      titleControls.start({
        top: '50%',
        rotate: 90,
        transition: { duration: 0.3, ease: "easeOut" }
      });
    }
  };

  return (
    <motion.div
      className="accordion-section"
      // Lógica PC
      onHoverStart={!mobileProps ? handleHover : undefined}
      onHoverEnd={!mobileProps ? handleHoverEnd : undefined}
      whileHover={!mobileProps ? { flex: 3 } : undefined}
      onUpdate={!mobileProps ? (latest) => {
        setIsFullyExpanded(latest.flex === 3);
      } : undefined}
      // Lógica Móvil
      onClick={mobileProps ? mobileProps.onToggle : undefined}
      style={{
        flex: mobileProps ? (mobileProps.isActive ? 8 : 1) : 1,
        minHeight: mobileProps ? '10vh' : 'auto'
      }}
      animate={mobileProps ? {
        flex: mobileProps.isActive ? 8 : 1
      } : undefined}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={bgImage}
        alt={title}
        fill
        style={{ objectFit: 'cover', zIndex: -1 }}
        priority
      />
      
      <motion.h2
        className={`section-title section-title-${title.toLowerCase().replace(/\s+/g, '')}`}
        initial={{ 
          top: '50%',
          rotate: mobileProps ? 0 : 90
        }}
        animate={mobileProps ? {
          top: mobileProps.isActive ? '12%' : '50%' // 2. Título más arriba cuando está activo
        } : titleControls}
      >
        {title}
      </motion.h2>

      {showContent && (
        <motion.div
          className="section-content relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{ 
            position: 'absolute',
            top: mobileProps ? '55%' : '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: mobileProps ? '90%' : '85%',
            aspectRatio: '9/5',
            maxHeight: '80vh',
            padding: mobileProps ? '2rem' : '1rem',
            borderRadius: '8px',
            marginBottom: mobileProps ? '2rem' : '0',
            overflow: 'hidden',
            backgroundColor: 'transparent' // Hacer el contenedor transparente
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            style={{
              opacity: 0.5, // Aumentar la opacidad del video
              mixBlendMode: 'normal', // Cambiar de 'multiply' a 'normal'
              zIndex: 0,
              transform: 'scale(1.1)',
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
          >
            <source src="/videos/pergamino.mp4" type="video/mp4" />
          </video>


          <div className="relative z-10 w-full h-full flex flex-col justify-center">
            <p style={{ 
              marginBottom: mobileProps ? '0.5rem' : '1rem',
              color: 'white',
              maxWidth: '70%', // Controla el ancho del texto
    margin: '0 auto', // Centra el texto horizontalmente
    textAlign: 'center'
            }}>{content}</p>
            <Link 
              href={link}
              className="section-button-wrapper"
              style={{ 
                textDecoration: 'none',
                marginTop: mobileProps ? 'auto' : '0'
              }}
            >
              <motion.button
                className="section-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                Ver más
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}