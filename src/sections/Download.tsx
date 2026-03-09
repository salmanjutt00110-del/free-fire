import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Apple, Play, Smartphone, Gamepad2, ChevronRight, Star, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DownloadSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.download-content',
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
        '.download-btn',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.download-buttons',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const platforms = [
    { icon: Apple, name: 'App Store', subtitle: 'Download for iOS' },
    { icon: Play, name: 'Google Play', subtitle: 'Download for Android' },
    { icon: Gamepad2, name: 'PC Launcher', subtitle: 'Windows & Mac' },
  ];

  const features = [
    { icon: Star, text: '4.8 Rating' },
    { icon: Shield, text: '100% Secure' },
    { icon: Zap, text: 'Free to Play' },
  ];

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-radial from-[#f6e194]/10 via-transparent to-transparent rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-gradient-radial from-[#fd5c57]/5 via-transparent to-transparent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 border border-[#f6e194]/20 rounded-full animate-float" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border border-[#fd5c57]/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-[#f6e194]/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="download-content text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <Smartphone className="w-4 h-4 text-[#f6e194]" />
              <span className="text-sm text-[#f6e194]">Available on All Platforms</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl lg:text-7xl xl:text-8xl font-bold font-['Teko'] mb-6">
              <span className="text-white">Join The </span>
              <span className="text-gradient-gold">Battle</span>
              <span className="text-white"> Today</span>
            </h2>

            <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-10">
              Download Shani Free Fire now and experience the most intense battle royale action. 
              Free to play, forever.
            </p>

            {/* Features */}
            <div className="flex justify-center gap-8 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <feature.icon className="w-5 h-5 text-[#f6e194]" />
                  <span className="text-white/70">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="download-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {platforms.map((platform, index) => (
                <button
                  key={index}
                  className="download-btn group relative overflow-hidden px-8 py-4 rounded-2xl glass-card hover:bg-white/10 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f6e194]/20 to-[#e7885a]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <platform.icon className="w-6 h-6 text-[#f6e194]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/50">{platform.subtitle}</div>
                    <div className="text-lg font-bold text-white font-['Teko']">{platform.name}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#f6e194] group-hover:translate-x-1 transition-all ml-auto" />
                </button>
              ))}
            </div>

            {/* Main CTA */}
            <button className="btn-primary text-xl px-12 py-5 group">
              <span className="flex items-center gap-3">
                <Download className="w-6 h-6" />
                Download Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* File Size & Version */}
            <div className="flex justify-center gap-6 mt-8 text-sm text-white/40">
              <span>Version 2.8.1</span>
              <span>•</span>
              <span>1.2 GB</span>
              <span>•</span>
              <span>Last Updated: Today</span>
            </div>

            {/* QR Code Section */}
            <div className="mt-16 glass-card rounded-3xl p-8 inline-block">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-2xl bg-white p-2">
                  {/* QR Code Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-black to-gray-800 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-5 gap-1">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-sm ${
                            Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white font-['Teko'] mb-2">
                    Scan to Download
                  </h4>
                  <p className="text-white/60 text-sm max-w-xs">
                    Point your camera at the QR code to download Shani Free Fire directly to your device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
