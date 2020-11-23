import React, { useState, useEffect } from 'react';
import ConfettiGenerator from "confetti-js";

const Canvas = (props) => {
    const [windowSize, setWindowSize] = useState([]);

    const canvasStyle = {
        position: 'absolute',
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: "-1"

    }

    useEffect(() => {

        const confettiSettings = {
            target: 'mainCanvas',
            max: 250,
            animate: false
        };

        function handleResize(){
            setWindowSize({})
        }

        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        window.addEventListener("resize",handleResize)
        return () => {
            window.removeEventListener("resize",handleResize);
            confetti.clear();
        }
    }, [windowSize]);

    return (
        <canvas id='mainCanvas' style={canvasStyle}></canvas>
    );
};

export default Canvas;
