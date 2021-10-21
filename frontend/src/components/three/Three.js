import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


function Box() {
    return (
        <mesh>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshLambertMaterial attach="material" color="hotpink"/>
        </mesh>
    )
}


const Three = () => {
    return (
        <Canvas>
            <OrbitControls/>
            <ambientLight/>
            <Box />
        </Canvas>
    )
}

export default Three
