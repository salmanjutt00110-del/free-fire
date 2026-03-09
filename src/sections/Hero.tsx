import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import { Play, ChevronRight, Trophy, Users, Target } from 'lucide-react';

// 3D Embers Particle System
const Embers = ({ count = 100 }: { count?: number }) => {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const particles = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return { positions, velocities };
  }, [count, viewport]);

  useFrame(() => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += particles.velocities[i * 3];
      positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
      positions[i * 3 + 2] += particles.velocities[i * 3 + 2];
      
      if (positions[i * 3 + 1] > viewport.height / 2) {
        positions[i * 3 + 1] = -viewport.height / 2;
        positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#e7885a"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Floating Weapon Component
const FloatingWeapon = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.1;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <group ref={meshRef} position={[2, 0, 0]}>
        {/* Weapon geometry */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 0.3, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[1, 0.2, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.25]} />
          <meshStandardMaterial color="#f6e194" metalness={0.9} roughness={0.1} emissive="#f6e194" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[-0.8, -0.1, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Glowing energy core */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshBasicMaterial color="#fd5c57" transparent opacity={0.8} />
        </mesh>
        <pointLight position={[0.3, 0, 0]} color="#fd5c57" intensity={2} distance={3} />
      </group>
    </Float>
  );
};

import { useThree } from '@react-three/fiber';
import React from 'react';

// 3D Scene
const HeroScene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#f6e194" />
      <pointLight position={[-5, 3, 0]} intensity={0.5} color="#fd5c57" />
      <Embers count={150} />
      <FloatingWeapon />
      <Sparkles
        count={50}
        scale={[10, 10, 10]}
        size={2}
        speed={0.5}
        color="#f6e194"
      />
    </>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-bg',
        { scale: 1.2, filter: 'blur(10px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotateX: 90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, delay: 0.5, ease: 'back.out(1.7)' }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        ctaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 1, ease: 'elastic.out(1, 0.5)' }
      );

      gsap.fromTo(
        '.stat-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 1.2, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, value: '50M+', label: 'Players' },
    { icon: Trophy, value: '#1', label: 'Battle Royale' },
    { icon: Target, value: '100+', label: 'Weapons' },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 hero-bg"
        style={{
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) scale(1.1)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Shani Free Fire"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* 3D Canvas Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <HeroScene />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 animate-float">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-white/80">Now Available Worldwide</span>
              </div>

              {/* Title */}
              <h1
                ref={titleRef}
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold font-['Teko'] leading-none mb-4 perspective-1000"
              >
                <span className="block text-white">SHANI</span>
                <span className="block text-gradient-gold animate-glitch">FREE FIRE</span>
              </h1>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-8"
              >
                Join the elite squad. Dominate the battlefield. Experience the ultimate
                battle royale with 50 players, one winner, and endless possibilities.
              </p>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="btn-primary group">
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Play Now
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="btn-secondary">Watch Trailer</button>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="flex justify-center lg:justify-start gap-8 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#f6e194]/20 to-[#e7885a]/20 mb-2 mx-auto lg:mx-0">
                      <stat.icon className="w-6 h-6 text-[#f6e194]" />
                    </div>
                    <div className="text-2xl font-bold text-gradient-gold font-['Teko']">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 3D Character Preview */}
            <div className="hidden lg:block relative">
              <div 
                className="relative w-full aspect-square"
                style={{
                  transform: `rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                {/* Glowing ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 rounded-full border-2 border-[#f6e194]/20 animate-pulse-glow" />
                  <div className="absolute w-96 h-96 rounded-full border border-[#f6e194]/10" />
                </div>
                
                {/* Character placeholder with glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f6e194]/20 to-transparent blur-3xl" />
                    <img
                      src="/images/char-wukong.png"
                      alt="Character"
                      className="relative z-10 w-full max-w-md drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;
