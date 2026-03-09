import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Characters from './sections/Characters';
import Weapons from './sections/Weapons';
import GameModes from './sections/GameModes';
import Stats from './sections/Stats';
import Download from './sections/Download';
import Footer from './sections/Footer';
import ParticleBackground from './sections/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black overflow-x-hidden">
      {/* 3D Particle Background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Characters />
        <Weapons />
        <GameModes />
        <Stats />
        <Download />
        <Footer />
      </main>
    </div>
  );
}

export default App;
