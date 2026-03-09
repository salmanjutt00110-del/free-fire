import { useState, useEffect } from 'react';
import { Menu, X, Gamepad2, Flame } from 'lucide-react';
import gsap from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'power3.inOut',
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Legends', id: 'characters' },
    { label: 'Arsenal', id: 'weapons' },
    { label: 'Modes', id: 'modes' },
    { label: 'Stats', id: 'stats' },
    { label: 'Play', id: 'download' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection('hero')}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#f6e194] to-[#e7885a] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Flame className="w-7 h-7 text-black" />
                </div>
                <div className="absolute inset-0 w-12 h-12 rounded-lg bg-[#f6e194] blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient-gold font-['Teko'] tracking-wider">
                  SHANI
                </span>
                <span className="text-xs text-white/50 tracking-widest -mt-1">
                  FREE FIRE
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f6e194]/0 via-[#f6e194]/10 to-[#f6e194]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#f6e194] to-[#e7885a] group-hover:w-1/2 transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button className="btn-primary text-sm py-3 px-6">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  Play Now
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-3xl font-['Teko'] text-white/70 hover:text-gradient-gold transition-all duration-300"
              style={{
                animationDelay: `${index * 0.1}s`,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 0.5s ease ${index * 0.1}s`,
              }}
            >
              {item.label}
            </button>
          ))}
          <button className="btn-primary mt-6">
            <span className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              Play Now
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
