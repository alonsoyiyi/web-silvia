'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const teamData = [
	{
		id: 1,
		image: '/team/1.webp',
		name: 'Alexander García',
		role: 'Director Creativo',
		bio: 'Líder visionario con más de 8 años de experiencia en proyectos transmedia. Apasionado por contar historias que conecten con las personas.',
	},
	{
		id: 2,
		image: '/team/2.webp',
		name: 'Marina López',
		role: 'Productora Ejecutiva',
		bio: 'Especialista en gestión de proyectos audiovisuales con un enfoque en contenido documental y narrativas innovadoras.',
	},
	{
		id: 3,
		image: '/team/3.webp',
		name: 'Carlos Ruiz',
		role: 'Director de Fotografía',
		bio: 'Fotógrafo premiado con un ojo único para capturar momentos mágicos y transformarlos en historias visuales impactantes.',
	},
	{
		id: 4,
		image: '/team/4.webp',
		name: 'Ana Martínez',
		role: 'Diseñadora de Sonido',
		bio: 'Creadora de paisajes sonoros inmersivos que transportan a la audiencia a mundos extraordinarios.',
	},
	{
		id: 5,
		image: '/team/5.webp',
		name: 'Diego Torres',
		role: 'Desarrollador de Videojuegos',
		bio: 'Programador creativo especializado en crear experiencias interactivas que desafían los límites de la narrativa tradicional.',
	},
	{
		id: 6,
		image: '/team/6.webp',
		name: 'Laura Sánchez',
		role: 'Guionista',
		bio: 'Escritora apasionada por entrelazar realidad y ficción en historias que cautivan y transforman.',
	},
	{
		id: 7,
		image: '/team/7.webp',
		name: 'Roberto Mendoza',
		role: 'Artista 3D',
		bio: 'Creador de mundos virtuales y experiencias visuales que desafían la imaginación.',
	},
	{
		id: 8,
		image: '/team/8.webp',
		name: 'Patricia Vega',
		role: 'Directora de Arte',
		bio: 'Artista visual con una visión única para crear atmósferas y estéticas memorables.',
	},
	{
		id: 9,
		image: '/team/9.webp',
		name: 'Juan Castro',
		role: 'Editor Audiovisual',
		bio: 'Maestro en el arte de dar ritmo y vida a las historias a través del montaje.',
	}
];

const CarouselItem = ({ person, index, currentIndex, totalItems, onClick }) => {
	let position = ((index - currentIndex + totalItems) % totalItems) - Math.floor(totalItems / 2);
	
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

	return (
		<motion.div
			className="absolute top-0 left-0 right-0 bottom-0"
			initial={false}
			animate={variants[getVariant()]}
			transition={{ duration: 0.5 }}
			onClick={() => getVariant() === 'center' && onClick(person)}
			style={{ 
				width: '400px',
				height: '500px',
				margin: '0 auto',
				cursor: getVariant() === 'center' ? 'pointer' : 'default'
			}}
		>
			<div className="relative w-full h-full rounded-lg overflow-hidden">
				<Image
					src={person.image}
					alt={person.name}
					fill
					className="object-cover"
				/>
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
				className="relative w-[80%] max-w-2xl bg-black/80 p-8 rounded-lg"
				onClick={e => e.stopPropagation()}
			>
				<div className="relative w-full h-[400px] mb-4">
					<Image
						src={person.image}
						alt={person.name}
						fill
						className="object-cover rounded-lg"
					/>
				</div>
				<h2 className="text-2xl font-bold text-white mb-2">{person.name}</h2>
				<p className="text-xl text-white/80 mb-4">{person.role}</p>
				<p className="text-white/60">{person.bio}</p>
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
		<div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 relative">
			<Link 
				href="/"
				className="absolute top-10 left-10 px-6 py-2 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
			>
				Volver
			</Link>

			<div className="relative w-full h-[600px] flex items-center justify-center mt-20">
				<div className="relative w-[80%] h-full">
					{teamData.map((person, index) => (
						<CarouselItem
							key={person.id}
							person={person}
							index={index}
							currentIndex={currentIndex}
							totalItems={teamData.length}
							onClick={setSelectedPerson}
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