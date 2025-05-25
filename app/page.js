import Carousel from './components/Carousel';
import '../app/styles.css';

export default function Home() {
  return (
    <main className="main-container">
      <div className="video-section">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/videos/fondo1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="content-section flex items-center justify-center py-20"> {/* Modificado aquí */}
        <section className="slider-section w-full max-w-7xl mx-auto"> {/* Modificado aquí */}
          <Carousel />
        </section>
      </div>
    </main>
  );
}