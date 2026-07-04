"use client";

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function HeroGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);

  const accents = useMemo(
    () => [
      { position: [-2.6, 1.3, -0.8] as [number, number, number], scale: 0.34, color: "#67e8f9" },
      { position: [2.4, -1.4, 0.5] as [number, number, number], scale: 0.44, color: "#a78bfa" },
      { position: [1.7, 1.8, -1.2] as [number, number, number], scale: 0.24, color: "#f472b6" },
      { position: [-1.2, -1.9, 0.8] as [number, number, number], scale: 0.28, color: "#22d3ee" },
    ],
    []
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetY = state.pointer.x * 0.5;
      const targetX = state.pointer.y * 0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.06
      );
      groupRef.current.rotation.z += delta * 0.08;
    }

    if (orbRef.current) {
      orbRef.current.rotation.x += delta * 0.35;
      orbRef.current.rotation.y -= delta * 0.28;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh ref={orbRef} scale={1.45}>
          <icosahedronGeometry args={[1.3, 20]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            metalness={0.55}
            roughness={0.12}
            distort={0.38}
            speed={2}
            transmission={0.55}
            thickness={1.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={1.4} floatIntensity={1.1}>
        <mesh position={[0, 0, -1.8]} rotation={[0.8, 0.2, 0.6]}>
          <torusKnotGeometry args={[1.9, 0.15, 220, 28, 2, 3]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#0f172a"
            emissiveIntensity={1.15}
            metalness={0.9}
            roughness={0.16}
          />
        </mesh>
      </Float>

      {accents.map((accent) => (
        <Float
          key={accent.color + accent.position.join("-")}
          speed={1.4}
          rotationIntensity={1.1}
          floatIntensity={1.7}
        >
          <mesh position={accent.position} scale={accent.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={accent.color}
              emissive={accent.color}
              emissiveIntensity={0.65}
              metalness={0.25}
              roughness={0.18}
            />
          </mesh>
        </Float>
      ))}

      <Sparkles
        count={120}
        scale={[7.5, 5, 7.5]}
        size={4}
        speed={0.35}
        opacity={0.75}
        color="#c4b5fd"
      />
    </group>
  );
}

export function ShowcaseScene() {
  return (
    <div className="relative h-[360px] overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,#1e293b_0%,#0b1120_48%,#050816_100%)] shadow-[0_30px_120px_rgba(8,15,40,0.65)] md:h-[420px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.16),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.22),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.12),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/8 to-transparent" />
      <Canvas camera={{ position: [0, 0, 6.5], fov: 42 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#050816"]} />
        <fog attach="fog" args={["#050816", 8, 18]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={2.8} color="#c4b5fd" />
        <pointLight position={[-4, -2, 3]} intensity={32} color="#67e8f9" distance={12} />
        <pointLight position={[3, 1, -2]} intensity={24} color="#f472b6" distance={12} />
        <HeroGeometry />
      </Canvas>
    </div>
  );
}
