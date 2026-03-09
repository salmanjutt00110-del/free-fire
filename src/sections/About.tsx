import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Crosshair, Map } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.fromTo(
        '.about-text',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.about-card',
        { y: 100, opacity: 0, rotate: -10 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Features animation
      gsap.fromTo(
        '.feature-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Fast-Paced Action',
      description: '10-minute matches with intense gameplay',
    },
    {
      icon: Shield,
      title: 'Strategic Combat',
      description: 'Use cover, tactics, and teamwork to win',
    },
    {
      icon: Crosshair,
      title: 'Precision Shooting',
      description: 'Master diverse weapons and attachments',
    },
    {
      icon: Map,
      title: 'Dynamic Maps',
      description: 'Explore ever-changing battlegrounds',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#f6e194]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[#fd5c57]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="about-text">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <span className="text-sm text-[#f6e194]">About The Game</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold font-['Teko'] mb-6">
                <span className="text-white">Enter The </span>
                <span className="text-gradient-gold">Arena</span>
              </h2>

              <p className="text-lg text-white/70 mb-6 leading-relaxed">
                Experience the ultimate battle royale phenomenon that has taken the world by storm. 
                Shani Free Fire drops 50 players onto a remote island where only one can emerge victorious.
              </p>

              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Strategize, survive, and conquer in a world where every decision matters. 
                With realistic graphics, smooth controls, and heart-pounding action, 
                every match is a new adventure.
              </p>

              {/* Stats Row */}
              <div className="flex gap-8 mb-8">
                <div>
                  <div className="text-4xl font-bold text-gradient-gold font-['Teko']">50M+</div>
                  <div className="text-sm text-white/50">Active Players</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-gold font-['Teko']">100+</div>
                  <div className="text-sm text-white/50">Unique Weapons</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-gold font-['Teko']">24/7</div>
                  <div className="text-sm text-white/50">Live Events</div>
                </div>
              </div>
            </div>

            {/* Right Content - Image Cards */}
            <div ref={cardsRef} className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="about-card group relative overflow-hidden rounded-2xl border-glow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/images/gameplay-1.jpg"
                      alt="Gameplay"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-sm text-[#f6e194]">Tropical Combat</span>
                  </div>
                  {/* Holographic scan effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f6e194]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-full group-hover:translate-y-[-200%]" style={{ transition: 'transform 0.6s ease, opacity 0.3s' }} />
                </div>

                {/* Card 2 */}
                <div className="about-card group relative overflow-hidden rounded-2xl border-glow mt-8">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/images/gameplay-2.jpg"
                      alt="Action"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-sm text-[#f6e194]">Urban Warfare</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f6e194]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-full group-hover:translate-y-[-200%]" style={{ transition: 'transform 0.6s ease, opacity 0.3s' }} />
                </div>

                {/* Card 3 - Full Width */}
                <div className="about-card group relative overflow-hidden rounded-2xl border-glow col-span-2">
                  <div className="aspect-[21/9] overflow-hidden">
                    <img
                      src="/images/gameplay-3.jpg"
                      alt="Drop In"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-lg font-['Teko'] text-[#f6e194]">Battle Royale Drop</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f6e194]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-full group-hover:translate-y-[-200%]" style={{ transition: 'transform 0.6s ease, opacity 0.3s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="features-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-item group p-6 rounded-2xl glass-card glass-card-hover transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f6e194]/20 to-[#e7885a]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-[#f6e194]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Teko']">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
