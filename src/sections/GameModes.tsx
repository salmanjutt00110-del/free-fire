import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, Users, Timer, Skull, Target, Shield, Zap, Map } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GameMode {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  players: string;
  duration: string;
  icon: React.ElementType;
  features: string[];
  color: string;
  bgImage: string;
}

const gameModes: GameMode[] = [
  {
    id: 1,
    name: 'Battle Royale',
    subtitle: 'Classic Mode',
    description: 'The ultimate survival experience. 50 players parachute onto an island and fight to be the last one standing.',
    players: '50',
    duration: '10-15 min',
    icon: Crown,
    features: ['Solo, Duo & Squad', 'Shrinking Safe Zone', 'Air Drops', 'Vehicles'],
    color: '#f6e194',
    bgImage: '/images/gameplay-3.jpg',
  },
  {
    id: 2,
    name: 'Clash Squad',
    subtitle: 'Team Deathmatch',
    description: 'Fast-paced 4v4 team battles. Coordinate with your squad and dominate the arena.',
    players: '4v4',
    duration: '5-8 min',
    icon: Users,
    features: ['Ranked Matches', 'Custom Loadouts', 'Multiple Rounds', 'Team Strategy'],
    color: '#fd5c57',
    bgImage: '/images/gameplay-2.jpg',
  },
  {
    id: 3,
    name: 'Lone Wolf',
    subtitle: 'Solo Mode',
    description: 'Every player for themselves. Test your skills against 49 other lone warriors.',
    players: '50',
    duration: '10-12 min',
    icon: Skull,
    features: ['Pure Skill', 'No Teams', 'Intense Action', 'Survival Focus'],
    color: '#a855f7',
    bgImage: '/images/gameplay-1.jpg',
  },
];

const GameModes = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.modes-header',
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
        '.mode-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.modes-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentMode = gameModes[activeMode];

  return (
    <section
      id="modes"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div 
        className="absolute inset-0 transition-all duration-700"
        style={{
          backgroundImage: `url(${currentMode.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="modes-header text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Map className="w-4 h-4 text-[#f6e194]" />
              <span className="text-sm text-[#f6e194]">Game Modes</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold font-['Teko'] mb-4">
              <span className="text-white">Choose Your </span>
              <span className="text-gradient-gold">Battlefield</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Multiple game modes for every playstyle. From intense solo survival to coordinated team battles.
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {gameModes.map((mode, index) => {
              const Icon = mode.icon;
              const isActive = activeMode === index;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(index)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                    isActive ? 'glass-card' : 'hover:bg-white/5'
                  }`}
                >
                  <Icon className={isActive ? 'w-5 h-5 text-[#f6e194]' : 'w-5 h-5 text-white/50'} />
                  <span className={isActive ? "font-['Teko'] text-lg text-white" : "font-['Teko'] text-lg text-white/50"}>
                    {mode.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Mode Display */}
          <div className="modes-grid grid lg:grid-cols-2 gap-8">
            {/* Left - Mode Info */}
            <div className="mode-card glass-card rounded-3xl p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${currentMode.color}20` }}
                >
                  <currentMode.icon className="w-8 h-8 text-[#f6e194]" />
                </div>
                <div>
                  <div className="text-sm text-[#f6e194]">
                    {currentMode.subtitle}
                  </div>
                  <h3 className="text-4xl font-bold text-white font-['Teko']">
                    {currentMode.name}
                  </h3>
                </div>
              </div>

              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                {currentMode.description}
              </p>

              {/* Quick Stats */}
              <div className="flex gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Players</div>
                    <div className="text-lg font-bold text-white font-['Teko']">
                      {currentMode.players}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Timer className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Duration</div>
                    <div className="text-lg font-bold text-white font-['Teko']">
                      {currentMode.duration}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {currentMode.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentMode.color }}
                    />
                    <span className="text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className="btn-primary mt-8 w-full"
                style={{ 
                  background: `linear-gradient(135deg, ${currentMode.color} 0%, ${currentMode.color}80 100%)` 
                }}
              >
                Play {currentMode.name}
              </button>
            </div>

            {/* Right - Mode Preview */}
            <div className="mode-card relative rounded-3xl overflow-hidden">
              <img
                src={currentMode.bgImage}
                alt={currentMode.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-sm text-white/50 mb-2">Featured Map</div>
                    <div className="text-2xl font-bold text-white font-['Teko']">
                      Bermuda Remastered
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {['Solo', 'Duo', 'Squad'].map((type) => (
                      <span 
                        key={type}
                        className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/70"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute top-6 right-6 glass-card rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-[#f6e194]" />
                  <span className="text-xs text-white/50">Win Rate</span>
                </div>
                <div className="text-2xl font-bold text-[#f6e194] font-['Teko']">
                  24.5%
                </div>
              </div>
            </div>
          </div>

          {/* All Modes Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Zap, title: 'Fast-Paced', desc: 'Quick matches for instant action' },
              { icon: Shield, title: 'Ranked System', desc: 'Climb the competitive ladder' },
              { icon: Crown, title: 'Rewards', desc: 'Earn exclusive skins and items' },
            ].map((item, index) => (
              <div 
                key={index}
                className="glass-card rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f6e194]/20 to-[#e7885a]/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#f6e194]" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Teko'] mb-2">{item.title}</h4>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameModes;
