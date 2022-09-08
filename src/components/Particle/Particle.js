import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import React from 'react';
import './Particle.css';

function Particle(){
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);
    
    const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
    }, []);

    const options = {
        particles: {
            links: {
                distance: 150,
                enable: true,
            },
            move: {
                enable: true,
            },
            size: {
                value: 1,
            },
            shape: {
                type: "circle",
            },
        },
    }

    return(
        <Particles 
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={options}
            className="particles"
        />
        
    )
}

export default Particle;