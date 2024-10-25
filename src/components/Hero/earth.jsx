import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const EarthModel = () => {
    const mountRef = useRef(null);
    const texture = useTexture('./2k_earth_nightmap.jpg');
    useFrame(() => {
       mountRef.current.rotation.x += 0.005;
       mountRef.current.rotation.y += 0.01;
    })

    return (
        <mesh ref={mountRef}>
            <sphereGeometry args={[5, 50, 50]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}

function ThreeScene() {
    return (
        <Canvas>
            <ambientLight/>
            <pointLight position={[5, 5, 5]} intensity={3}/>
            <axesHelper args = {[10]}/>
            <EarthModel />
        </Canvas>
    );
}

const Earth = () => {
    return (
        <ThreeScene />
    )
}



export default Earth;
