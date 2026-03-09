import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crosshair, Zap, Target, Flame, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Weapon {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  damage: number;
  fireRate: number;
  range: number;
  color: string;
}

const weapons: Weapon[] = [
  {
    id: 1,
    name: 'Phoenix AR',
    type: 'Assault Rifle',
    description: 'A high-powered assault rifle with incendiary rounds that deal damage over time.',
    image: '/images/weapon-1.png',
    damage: 85,
    fireRate: 75,
    range: 80,
    color: '#e7885a',
  },
  {
    id: 2,
    name: 'Frost Sniper',
    type: 'Sniper Rifle',
    description: 'Precision long-range weapon with cryogenic rounds that slow enemies.',
    image: '/images/weapon-2.png',
    damage: 100,
    fireRate: 30,
    range: 100,
    color: '#3b82f6',
  },
  {
    id: 3,
    name: 'Void SMG',
    type: 'Submachine Gun',
    description: 'Rapid-fire weapon with plasma energy that melts through armor.',
    image: '/images/weapon-3.png',
    damage: 60,
    fireRate: 95,
    range: 50,
    color: '#a855f7',
  },
];

const Weapons = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeWeapon, setActiveWeapon] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
      }
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.weapons-header',
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
        '.weapon-showcase',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.weapon-showcase',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.weapon-list',
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.weapon-list',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentWeapon = weapons[activeWeapon];

  return (
    <section
      id="weapons"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, ${currentWeapon.color}10 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="weapons-header text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Crosshair className="w-4 h-4 text-[#f6e194]" />
              <span className="text-sm text-[#f6e194]">Your Arsenal</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold font-['Teko'] mb-4">
              <span className="text-white">Master The </span>
              <span className="text-gradient-gold">Weapons</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              From close-quarters combat to long-range precision, choose your weapon wisely.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Weapon Display */}
            <div className="weapon-showcase relative">
              <div 
                className="relative aspect-square flex items-center justify-center"
                style={{
                  transform: `rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{ background: currentWeapon.color }}
                />
                
                {/* Weapon Image */}
                <div className="relative z-10 w-full max-w-lg">
                  <img
                    src={currentWeapon.image}
                    alt={currentWeapon.name}
                    className="w-full h-auto drop-shadow-2xl transition-all duration-500"
                    style={{
                      filter: `drop-shadow(0 0 30px ${currentWeapon.color}50)`,
                    }}
                  />
                </div>

                {/* Rotating Ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div 
                    className="w-96 h-96 rounded-full border-2 border-dashed opacity-20 animate-spin"
                    style={{ borderColor: currentWeapon.color }}
                  />
                </div>
              </div>

              {/* Weapon Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 glass-card rounded-2xl p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Flame className="w-4 h-4" style={{ color: currentWeapon.color }} />
                      <span className="text-xs text-white/50">Damage</span>
                    </div>
                    <div className="text-2xl font-bold font-['Teko']" style={{ color: currentWeapon.color }}>
                      {currentWeapon.damage}%
                    </div>
                    <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${currentWeapon.damage}%`, background: currentWeapon.color }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Zap className="w-4 h-4" style={{ color: currentWeapon.color }} />
                      <span className="text-xs text-white/50">Fire Rate</span>
                    </div>
                    <div className="text-2xl font-bold font-['Teko']" style={{ color: currentWeapon.color }}>
                      {currentWeapon.fireRate}%
                    </div>
                    <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${currentWeapon.fireRate}%`, background: currentWeapon.color }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="w-4 h-4" style={{ color: currentWeapon.color }} />
                      <span className="text-xs text-white/50">Range</span>
                    </div>
                    <div className="text-2xl font-bold font-['Teko']" style={{ color: currentWeapon.color }}>
                      {currentWeapon.range}%
                    </div>
                    <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${currentWeapon.range}%`, background: currentWeapon.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Weapon List */}
            <div className="weapon-list space-y-4">
              {weapons.map((weapon, index) => (
                <button
                  key={weapon.id}
                  onClick={() => setActiveWeapon(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 group ${
                    activeWeapon === index
                      ? 'glass-card border-l-4'
                      : 'hover:bg-white/5'
                  }`}
                  style={{
                    borderLeftColor: activeWeapon === index ? weapon.color : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{ 
                          background: activeWeapon === index 
                            ? `${weapon.color}20` 
                            : 'rgba(255,255,255,0.05)' 
                        }}
                      >
                        <img 
                          src={weapon.image} 
                          alt={weapon.name}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div>
                        <div 
                          className="text-sm mb-1"
                          style={{ color: activeWeapon === index ? weapon.color : 'rgba(255,255,255,0.5)' }}
                        >
                          {weapon.type}
                        </div>
                        <h3 className="text-2xl font-bold text-white font-['Teko']">
                          {weapon.name}
                        </h3>
                      </div>
                    </div>
                    <ChevronRight 
                      className={`w-6 h-6 transition-all duration-300 ${
                        activeWeapon === index 
                          ? 'translate-x-0 opacity-100' 
                          : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50'
                      }`}
                      style={{ color: weapon.color }}
                    />
                  </div>
                  
                  <p className={`text-sm text-white/60 mt-3 transition-all duration-300 ${
                    activeWeapon === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    {weapon.description}
                  </p>
                </button>
              ))}

              {/* View All Button */}
              <button className="w-full py-4 rounded-2xl border border-dashed border-white/20 text-white/50 hover:text-white hover:border-[#f6e194]/50 transition-all duration-300 flex items-center justify-center gap-2 group">
                <span>View All Weapons</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weapons;
