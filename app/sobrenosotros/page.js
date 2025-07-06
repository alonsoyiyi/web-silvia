'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const teamData = [
	{
		id: 2,
		image: '/team/silvia.webp',
		name: 'Silvia Malca',
		role: 'Directora y Editora',
		bio: 'Silvia es el motor creativo detrás del proyecto. Su visión sensible y crítica se refleja en cada etapa del proceso. Su versatilidad le permite asumir diversos roles, desde la dirección hasta la edición y difusión, siempre con una búsqueda narrativa clara y coherente. Su capacidad para integrar la estética con el mensaje hace de su trabajo una pieza clave en la identidad del proyecto.',
	},
	{
		id: 1,
		image: '/team/ashly.webp',
		name: 'Ashly Pairazaman',
		role: 'Producción',
		bio: 'Ashly es el eje orgánico del equipo. Con una mente estratégica y una actitud resolutiva, se encarga de que cada etapa del proyecto avance de manera fluida. Su habilidad para coordinar equipos humanos y recursos logísticos es fundamental para el desarrollo fluido del proyecto, manteniendo siempre la energía y la motivación del grupo.',
	},
	{
		id: 7,
		image: '/team/helen.webp',
		name: 'Helen Alejandro',
		role: 'Asistente de producción ',
		bio: 'Helen es una presencia constante y confiable en el set, se mueve entre tareas con agilidad y compromiso. Su disposición y actitud proactiva la convierten en una pieza esencial para el funcionamiento del equipo. Siempre atenta, gestiona tiempos y necesidades con eficacia, manteniendo un ambiente armonioso y resolutivo.',
	},
	
	{
		id: 9,
		image: '/team/deoux.webp',
		name: 'Deoux Cordero',
		role: 'Dirección de Arte',
		bio: 'Deoux construye la identidad visual del proyecto desde los objetos, colores y texturas. Su enfoque simbólico y estético le da profundidad a cada espacio representado, potenciando la narrativa desde lo visual. ',
	},
	
	{
		id: 3,
		image: '/team/luis.webp',
		name: 'Luis Olascoaga',
		role: 'Iluminación y Cámara ',
		bio: 'Luis aporta precisión técnica y una mirada estética sólida. Su experiencia en el manejo de la luz y la cámara le permite construir imágenes cargadas de atmósfera, siempre al servicio del relato. Minucioso y comprometido, trabaja cada plano con pasión y profesionalismo.',
	},
	{
		id: 4,
		image: '/team/gerardo.webp',
		name: 'Gerardo Menacho',
		role: 'Iluminación y Edición',
		bio: 'Gerardo combina sensibilidad visual con un enfoque técnico riguroso. En el área de iluminación, aporta dramatismo y equilibrio a cada escena; en la postproducción, encuentra el ritmo justo del relato. Su mirada analítica y estética lo convierte en un pilar silencioso pero potente del equipo.',
	},
	{
		id: 5,
		image: '/team/kiara.webp',
		name: 'Kiara Porras',
		role: 'Cámaras',
		bio: 'Kiara registra tanto lo visible como lo audible. Su trabajo como camarógrafa se caracteriza por planos íntimos y expresivos, mientras que en el sonido directo captura con precisión la textura de cada momento. Su compromiso y capacidad de adaptación enriquecen cada etapa del proceso.',
	},
	{
		id: 6,
		image: '/team/brenda.webp',
		name: 'Brenda Lazo',
		role: 'Sonido y Edición',
		bio: 'Brenda escucha el proyecto desde adentro. Con una profunda sensibilidad hacia lo sonoro, se encarga de capturar y trabajar el audio con precisión narrativa. Además, desde la edición, aporta una mirada crítica que da cohesión y ritmo a la historia. Su pasión por los relatos inmersivos es el motor que impulsa su trabajo.',
	},
	
	{
		id: 8,
		image: '/team/gonzalo.webp',
		name: 'Gonzalo Verástegui',
		role: 'Sonido',
		bio: 'Gonzalo trabaja el sonido con meticulosidad y sensibilidad. Su capacidad para leer los climas del rodaje y traducirlos en un registro sonoro claro y envolvente, refuerza la atmósfera emocional de cada escena. Detallista y concentrado, aporta una dimensión fundamental al lenguaje del proyecto.',
	},
	
	{
		id: 10,
		image: '/team/JOAQUIN.webp',
		name: 'Joaquin Uriarte',
		role: 'Asistente de producción',
		bio: 'Su capacidad para adaptarse a diferentes demandas y anticipar necesidades facilita el desarrollo de cada jornada. Con iniciativa y empatía, contribuye a que el equipo funcione como una verdadera red colaborativa.',
	}
];

const CarouselItem = ({ person, index, currentIndex, totalItems, onClick, handleNext, handlePrev }) => {
	// Modificar el cálculo de la posición
	let position = index - currentIndex;
	
	// Ajustar para mantener el ciclo más suave
	if (position > Math.floor(totalItems / 2)) {
		position -= totalItems;
	} else if (position < -Math.floor(totalItems / 2)) {
		position += totalItems;
	}

	const variants = {
		center: {
			scale: 1,
			x: '0%',
			zIndex: 5,
			opacity: 1,
		},
		adjacent: {
			scale: 0.8,
			x: position < 0 ? '-60%' : '60%',
			zIndex: 4,
			opacity: 0.8,
		},
		outer: {
			scale: 0.6,
			x: position < 0 ? '-100%' : '100%',
			zIndex: 3,
			opacity: 0.6,
		},
		hidden: {
			scale: 0.4,
			x: position < 0 ? '-120%' : '120%',
			zIndex: 2,
			opacity: 0,
		}
	};

	const getVariant = () => {
		if (position === 0) return 'center';
		if (Math.abs(position) === 1) return 'adjacent';
		if (Math.abs(position) === 2) return 'outer';
		return 'hidden';
	};

	const handleClick = () => {
		const variant = getVariant();
		if (variant === 'center') {
			onClick(person);
		} else if (variant === 'adjacent') {
			// Si es adyacente, calculamos si es el siguiente o anterior
			const diff = index - currentIndex;
			if (diff === 1 || diff === -(totalItems - 1)) {
				handleNext();
			} else if (diff === -1 || diff === (totalItems - 1)) {
				handlePrev();
			}
		}
	};

	return (
		<motion.div
			className="absolute top-0 left-0 right-0 bottom-0"
			initial={false}
			animate={variants[getVariant()]}
			transition={{ duration: 0.5 }}
			onClick={handleClick}
			style={{ 
				width: '400px',
				height: '500px',
				margin: '0 auto',
				cursor: getVariant() === 'hidden' ? 'default' : 'pointer' // Cambiado para que los adyacentes también tengan cursor pointer
			}}
		>
			<div className="relative w-full h-full rounded-lg overflow-hidden">
				<Image
					src={person.image}
					alt={person.name}
					fill
					className="object-cover"
				/>
				{/* New overlay for text that only shows when centered */}
				{getVariant() === 'center' && (
					<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-center">
						<h3 className="text-2xl font-bold text-white mb-2 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.7)]">
							{person.name}
						</h3>
						<p className="text-lg text-white/90 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.7)]">
							{person.role}
						</p>
					</div>
				)}
			</div>
		</motion.div>
	);
};

const PersonModal = ({ person, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative w-[50%] max-w-xl bg-black/80 p-8 rounded-lg" // Changed from max-w-2xl to max-w-xl
                onClick={e => e.stopPropagation()}
            >
                <div className="relative w-[50%] aspect-[4/5] mb-6 mx-auto"> {/* Added w-[50%] and mx-auto */}
                    <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-contain rounded-lg"
                    />
                </div>
                <div className="space-y-4 text-center"> {/* Added spacing between elements */}
                    <h2 className="text-2xl font-bold text-white">{person.name}</h2>
                    <p className="text-lg text-white/80 mb-4">{person.role}</p>
                    <p className="text-m text-white/70  leading-relaxed">
                        {person.bio}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function View7() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % teamData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + teamData.length) % teamData.length);
    };

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

			{/* Nueva sección de información  */}
			<div className="w-full max-w-7xl mx-auto px-8 py-20 mt-20 flex items-start gap-12">
				<div className="w-1/2 space-y-12">
					<h1 className="text-6xl text-white font-bold">
						Productora <br /> Audiovisual
					</h1>
					
					<div className="space-y-6"> {/* Reduced from space-y-8 */}
    <div className="bg-[#cccccc] rounded-[20px] p-5"> {/* Reduced from p-6 */}
        <h2 className="text-xl text-white font-semibold mb-3 [text-shadow:_2px_2px_2px_rgb(0_0_0_/_50%)]">
            MISIÓN
        </h2>
        <p className="text-base text-black/80 leading-snug">
            Despertamos la creatividad para convertir las ideas de nuestros cliente en historias que conectan profundamente y crean vinculos duraderos.
        </p>
    </div>
    
    <div className="bg-[#cccccc] rounded-[20px] p-5"> {/* Reduced from p-6 */}
        <h2 className="text-xl text-white font-semibold mb-3 [text-shadow:_2px_2px_2px_rgb(0_0_0_/_50%)]">
            VISIÓN
        </h2>
        <p className="text-base text-black/80 leading-snug">
            Somos una productora audivisial que destaca por innovar y crear contenidos que no solo narran, sino que también inspiran y transforman. Conectamos a personas y marcas con narrativas visuales.
        </p>
    </div>
</div>
				</div>

				<div className="w-1/2 relative flex items-center justify-center -mt-8">
					<div className="relative w-[80%] flex flex-col gap-12">
        <div className="relative w-full h-[350px]"> {/* Changed from aspect-square to fixed height */}
            <Image
                src="/images/logo_grande1.webp"
                alt="Logo Productora Parte Superior"
                fill
                className="object-contain object-bottom"
            />
        </div>
        <div className="relative w-full h-[200px] -mt-10">
            <Image
                src="/images/logo_grande2.webp"
                alt="Logo Productora Parte Inferior"
                fill
                className="object-contain object-top"
            />
        </div>
    </div>
				</div>
			</div>

			{/* Nueva sección de equipo */}
<div className="w-full max-w-7xl mx-auto px-8 py-12">
    <h2 className="text-4xl text-white font-semibold mb-4 text-left">
        Conoce al equipo
    </h2>
    <p className="text-xl text-white/80 text-left">
        Descubre a nuestro equipo creativo. cada uno aportando talento y pasión para hacer realidad historias que conectan.
    </p>
</div>

			{/* Slider existente */}
			<div className="relative w-full h-[600px] flex items-center justify-center">
				<div className="relative w-[80%] h-full">
					{teamData.map((person, index) => (
						<CarouselItem
							key={person.id}
							person={person}
							index={index}
							currentIndex={currentIndex}
							totalItems={teamData.length}
							onClick={setSelectedPerson}
							handleNext={handleNext}  // Añadido
							handlePrev={handlePrev}  // Añadido
						/>
					))}
				</div>

				<button
					onClick={handlePrev}
					className="absolute left-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
				>
					<IoChevronBackOutline className="text-white text-2xl" />
				</button>
				<button
					onClick={handleNext}
					className="absolute right-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
				>
					<IoChevronForwardOutline className="text-white text-2xl" />
				</button>
			</div>

			<AnimatePresence>
				{selectedPerson && (
					<PersonModal 
						person={selectedPerson} 
						onClose={() => setSelectedPerson(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}