"use client";

import { ContactShadows, Environment, Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function MetallicKnot() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetY = state.pointer.x * 0.35;
      const targetX = -state.pointer.y * 0.18;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY + state.clock.elapsedTime * 0.15,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.06
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.1} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh castShadow receiveShadow>
          <torusKnotGeometry args={[1.05, 0.34, 320, 48, 2, 3]} />
          <meshPhysicalMaterial
            color="#f4f4f8"
            metalness={1}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={1.6}
          />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh position={[1.2, 0.8, -0.6]} rotation={[0.6, 0.2, 0.4]} scale={0.18}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial color="#a78bfa" metalness={0.3} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1.1}>
        <mesh position={[-1.1, -0.7, 0.4]} rotation={[0.4, 0.6, 0.1]} scale={0.12}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.2} roughness={0.3} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.9} floatIntensity={1.3}>
        <mesh position={[0.9, -1.1, 0.2]} scale={0.1}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#22c55e" metalness={0.2} roughness={0.3} />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1}>
        <mesh position={[-0.8, 1.2, 0.1]} scale={0.09}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.25} roughness={0.3} />
        </mesh>
      </Float>

      <Sparkles
        count={70}
        scale={[5, 4, 5]}
        size={3}
        speed={0.25}
        opacity={0.6}
        color="#6366f1"
      />
    </group>
  );
}

export function ShowcaseScene() {
  const lighting = useMemo(
    () => ({
      sun: [4, 5, 3] as [number, number, number],
      rim: [-4, 2, -3] as [number, number, number],
    }),
    []
  );

  return (
    <div className="relative h-[360px] overflow-hidden rounded-[32px] border border-white/60 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.95),rgba(244,240,255,0.6)_60%,rgba(232,222,255,0.35)_100%)] shadow-[0_30px_120px_rgba(124,58,237,0.18)] md:h-[440px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.16),transparent_40%),radial-gradient(circle_at_82%_30%,rgba(244,114,182,0.18),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.18),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/70 to-transparent" />
      <Canvas
        camera={{ position: [0, 0.2, 5.2], fov: 38 }}
        dpr={[1, 1.8]}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight
          position={lighting.sun}
          intensity={2.2}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={lighting.rim} intensity={0.9} color="#60a5fa" />
        <pointLight position={[-2.5, -1.5, 2]} intensity={14} color="#6366f1" distance={9} />
        <pointLight position={[2.5, 1.2, -1]} intensity={12} color="#0ea5e9" distance={9} />
        <MetallicKnot />
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.35}
          scale={6}
          blur={2.2}
          far={3}
          color="#3b82f6"
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
