import Accordion from './components/Accordion';
import './components/Accordion/styles.css';

export default function Home() {
  return (
    <main className="main-container">
      <header className="header">
        <h1>Proyecto Transmedial</h1>
      </header>
      <section className="accordion-section">
        <Accordion />
      </section>
    </main>
  );
}