import Accordion from './components/Accordion';
import './components/Accordion/styles.css';

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

      <div className="content-section">
        <section className="accordion-section">
          <Accordion />
        </section>
      </div>
    </main>
  );
}