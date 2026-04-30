import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Cloud, PerspectiveCamera, Environment, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Book3D({ position, color, rotation = [0, 0, 0] }: { position: [number, number, number], color: string, rotation?: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} rotation={new THREE.Euler(...rotation)} receiveShadow castShadow>
        {/* Book Body */}
        <boxGeometry args={[1, 1.4, 0.2]} />
        <meshStandardMaterial color={color} />
        
        {/* Pages */}
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[0.9, 1.3, 0.18]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </mesh>
    </Float>
  );
}

function Star({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={1}>
      <mesh position={position}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#FFD300" emissive="#FFD300" emissiveIntensity={2} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full opacity-60">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        {/* Scene Background Elements */}
        <Clouds />
        
        {/* Floating Whimsical Items */}
        <Book3D position={[-2, 1, 0]} color="#E67E22" rotation={[0.2, 0.4, 0.1]} />
        <Book3D position={[2.5, -1, -1]} color="#3498DB" rotation={[-0.1, -0.3, -0.2]} />
        <Book3D position={[-1.5, -2, -2]} color="#9B59B6" rotation={[0.4, 0.2, -0.1]} />
        
        <Star position={[3, 2, -2]} />
        <Star position={[-3.5, 0, -3]} />
        <Star position={[1, 2.5, -1]} />
        <Star position={[-1, -2.5, 1]} />

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

function Clouds() {
  return (
    <>
      <Cloud 
        opacity={0.4}
        speed={0.4} 
        segments={20} 
        position={[-4, 2, -5]}
        color="#FFF"
      />
      <Cloud 
        opacity={0.3}
        speed={0.3}
        segments={20}
        position={[4, -2, -6]}
        color="#FDF4E3"
      />
    </>
  );
}
