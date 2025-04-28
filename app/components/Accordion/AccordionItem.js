import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AccordionItem({ title, content, link, bgImage }) {
  const titleControls = useAnimation();
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Efecto para manejar el timer del contenido
  useEffect(() => {
    let timer;
    if (isFullyExpanded) {
      timer = setTimeout(() => {
        setShowContent(true);
      }, 400); // Esperamos 400ms después de que isFullyExpanded sea true
    } else {
      setShowContent(false); // Ocultamos inmediatamente cuando isFullyExpanded es false
    }
    return () => clearTimeout(timer);
  }, [isFullyExpanded]);

  const handleHover = async () => {
    titleControls.start({
      top: '15%',
      rotate: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    });
  };

  const handleHoverEnd = () => {
    setIsFullyExpanded(false);
    titleControls.start({
      top: '50%',
      rotate: 90,
      transition: { duration: 0.3, ease: "easeOut" }
    });
  };

  return (
    <motion.div
      className="accordion-section"
      onHoverStart={!isMobile ? handleHover : undefined}
      onHoverEnd={!isMobile ? handleHoverEnd : undefined}
      onClick={isMobile ? () => setIsFullyExpanded(!isFullyExpanded) : undefined}
      whileHover={!isMobile ? { flex: 3 } : undefined}
      animate={isMobile ? {
        height: isFullyExpanded ? '40vh' : '10vh'
      } : undefined}
      transition={{ duration: 0.5 }}
      onUpdate={(latest) => {
        if (!isMobile) {
          setIsFullyExpanded(latest.flex === 3);
        }
      }}
    >
      <Image
        src={bgImage}
        alt={title}
        fill
        style={{ objectFit: 'cover', zIndex: -1 }}
        priority
      />
      
      <motion.h2
        className="section-title"
        initial={{ top: '50%', rotate: 90 }}
        animate={titleControls}
      >
        {title}
      </motion.h2>

      {showContent && (
        <motion.div
          className="section-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <p>{content}</p>
          {/* Modificamos esta parte */}
          <Link 
            href={link}
            className="section-button-wrapper"
            style={{ textDecoration: 'none' }}
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
        </motion.div>
      )}
    </motion.div>
  );
}