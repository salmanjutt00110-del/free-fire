import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating Particles
const Particles = ({ count = 200 }: { count?: number }) => {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      // Colors (gold, orange, red variations)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Gold
        colors[i * 3] = 0.965;
        colors[i * 3 + 1] = 0.882;
        colors[i * 3 + 2] = 0.58;
      } else if (colorChoice < 0.66) {
        // Orange
        colors[i * 3] = 0.906;
        colors[i * 3 + 1] = 0.533;
        colors[i * 3 + 2] = 0.353;
      } else {
        // Red
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 0.2;
      }
    }

    return { positions, velocities, colors };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Update position
      positions[i * 3] += particles.velocities[i * 3];
      positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
      positions[i * 3 + 2] += particles.velocities[i * 3 + 2];

      // Reset if out of bounds
      if (positions[i * 3 + 1] > 10) {
        positions[i * 3 + 1] = -10;
        positions[i * 3] = (Math.random() - 0.5) * 20;
      }
      if (Math.abs(positions[i * 3]) > 10) {
        positions[i * 3] *= -0.9;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Gentle rotation
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// Connecting Lines
const ConnectionLines = ({ count = 50 }: { count?: number }) => {
  const linesRef = useRef<THREE.LineSegments>(null);

  const lines = useMemo(() => {
    const positions = new Float32Array(count * 6);

    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 15;
      const y1 = (Math.random() - 0.5) * 15;
      const z1 = (Math.random() - 0.5) * 5;

      const x2 = x1 + (Math.random() - 0.5) * 3;
      const y2 = y1 + (Math.random() - 0.5) * 3;
      const z2 = z1 + (Math.random() - 0.5) * 2;

      positions[i * 6] = x1;
      positions[i * 6 + 1] = y1;
      positions[i * 6 + 2] = z1;
      positions[i * 6 + 3] = x2;
      positions[i * 6 + 4] = y2;
      positions[i * 6 + 5] = z2;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[lines, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#f6e194"
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};

// Glowing Orbs
const GlowingOrbs = ({ count = 5 }: { count?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.5 + 0.2,
      color: i % 2 === 0 ? '#f6e194' : '#fd5c57',
    }));
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const orb = orbs[i];
        child.position.y += Math.sin(state.clock.elapsedTime * orb.speed) * 0.002;
        child.rotation.x += 0.001;
        child.rotation.y += 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.scale, 32, 32]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.15}
          />
          <pointLight
            color={orb.color}
            intensity={0.5}
            distance={5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#f6e194" />
      <Particles count={150} />
      <ConnectionLines count={30} />
      <GlowingOrbs count={6} />
    </>
  );
};

// Main Component
const ParticleBackground = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
