import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star, Zap, Shield, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Character {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  stats: {
    speed: number;
    power: number;
    technique: number;
  };
  ability: string;
}

const characters: Character[] = [
  {
    id: 1,
    name: 'Wukong',
    role: 'Assault',
    description: 'A nimble warrior with unmatched agility and close-quarters combat expertise.',
    image: '/images/char-wukong.png',
    stats: { speed: 95, power: 75, technique: 85 },
    ability: 'Camouflage',
  },
  {
    id: 2,
    name: 'Kelly',
    role: 'Stealth',
    description: 'Master of shadows who strikes from the darkness with deadly precision.',
    image: '/images/char-kelly.png',
    stats: { speed: 90, power: 80, technique: 95 },
    ability: 'Shadow Step',
  },
  {
    id: 3,
    name: 'Andrew',
    role: 'Sniper',
    description: 'Veteran marksman who never misses his target from any distance.',
    image: '/images/char-andrew.png',
    stats: { speed: 65, power: 95, technique: 90 },
    ability: 'Eagle Eye',
  },
  {
    id: 4,
    name: 'Laura',
    role: 'Support',
    description: 'Tactical genius with advanced tech that turns the tide of battle.',
    image: '/images/char-laura.png',
    stats: { speed: 75, power: 70, technique: 100 },
    ability: 'Tech Override',
  },
];

const Characters = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.characters-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.carousel-container',
        { rotateY: 180, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % characters.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + characters.length) % characters.length);
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + characters.length + Math.floor(characters.length / 2)) % characters.length) - Math.floor(characters.length / 2);
    
    const rotateY = normalizedDiff * 45;
    const translateX = normalizedDiff * 300;
    const translateZ = Math.abs(normalizedDiff) * -200;
    const scale = 1 - Math.abs(normalizedDiff) * 0.2;
    const opacity = 1 - Math.abs(normalizedDiff) * 0.4;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(opacity, 0.3),
      zIndex: 10 - Math.abs(normalizedDiff),
    };
  };

  const activeCharacter = characters[activeIndex];

  return (
    <section
      id="characters"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#f6e194]/5 to-transparent rounded-full" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="characters-header text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Star className="w-4 h-4 text-[#f6e194]" />
              <span className="text-sm text-[#f6e194]">Choose Your Legend</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold font-['Teko'] mb-4">
              <span className="text-white">Meet The </span>
              <span className="text-gradient-gold">Legends</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Each character brings unique abilities and playstyles. Find your perfect match and dominate the battlefield.
            </p>
          </div>

          {/* 3D Carousel */}
          <div ref={carouselRef} className="relative perspective-1000">
            <div className="carousel-container relative h-[500px] lg:h-[600px] flex items-center justify-center preserve-3d">
              {characters.map((character, index) => (
                <div
                  key={character.id}
                  className="absolute w-64 lg:w-80 transition-all duration-600 ease-out cursor-pointer"
                  style={getCardStyle(index)}
                  onClick={() => goToSlide(index)}
                >
                  <div className="relative group">
                    {/* Card Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f6e194]/10 to-transparent rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Character Image */}
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group-hover:border-[#f6e194]/50 transition-colors">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      
                      {/* Character Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="text-sm text-[#f6e194] mb-1">{character.role}</div>
                        <h3 className="text-3xl font-bold text-white font-['Teko']">{character.name}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-[#f6e194] hover:border-[#f6e194]/50 transition-all z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-[#f6e194] hover:border-[#f6e194]/50 transition-all z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Active Character Details */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="glass-card rounded-3xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left - Description */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-3xl font-bold text-white font-['Teko']">
                      {activeCharacter.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-[#f6e194]/20 text-[#f6e194] text-sm">
                      {activeCharacter.role}
                    </span>
                  </div>
                  <p className="text-white/70 mb-6">{activeCharacter.description}</p>
                  
                  {/* Ability */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                    <Zap className="w-6 h-6 text-[#f6e194]" />
                    <div>
                      <div className="text-sm text-white/50">Special Ability</div>
                      <div className="text-lg font-bold text-[#f6e194] font-['Teko']">
                        {activeCharacter.ability}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Stats */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-4 font-['Teko']">Character Stats</h4>
                  
                  {/* Speed */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-[#f6e194]" />
                        <span className="text-sm text-white/70">Speed</span>
                      </div>
                      <span className="text-sm text-[#f6e194]">{activeCharacter.stats.speed}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#f6e194] to-[#e7885a] rounded-full transition-all duration-500"
                        style={{ width: `${activeCharacter.stats.speed}%` }}
                      />
                    </div>
                  </div>

                  {/* Power */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#fd5c57]" />
                        <span className="text-sm text-white/70">Power</span>
                      </div>
                      <span className="text-sm text-[#fd5c57]">{activeCharacter.stats.power}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#fd5c57] to-[#ff3333] rounded-full transition-all duration-500"
                        style={{ width: `${activeCharacter.stats.power}%` }}
                      />
                    </div>
                  </div>

                  {/* Technique */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#4ade80]" />
                        <span className="text-sm text-white/70">Technique</span>
                      </div>
                      <span className="text-sm text-[#4ade80]">{activeCharacter.stats.technique}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] rounded-full transition-all duration-500"
                        style={{ width: `${activeCharacter.stats.technique}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {characters.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#f6e194] w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Characters;
