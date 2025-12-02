import React from 'react';
import {useEffect, useRef, useState} from 'react';

function App() {
    const guitar = useRef(new Audio("/project 1 guitar.mp3"));
    const bass = useRef(new Audio("/project 1 bass.mp3"));
    const drums = useRef(new Audio("/project 1 drums.mp3"));
    const pads = useRef(new Audio("/project 1 pads.mp3"));
    const vocals = useRef(new Audio("/project 1 vocals.mp3"));
    //const mutedMaster = useRef(new Audio("/project 1 muted.mp3"));
    
    const [selected, setSelected] = useState({});

    useEffect(() => {
        //get user preferences from local storage
        const saved = JSON.parse(localStorage.getItem("instruments") || "{}");

        //convert to global variable basically
        setSelected(saved);
    }, []);

    const audioRefs = {guitar, bass, drums, pads, vocals};

    const instruments = Object.keys(selected)
        .filter(name => selected[name])
        .map(name => audioRefs[name]); 

    function onPlay() {
        instruments.forEach(ref => ref.current.play());
    }

    function onPause() {
        instruments.forEach(ref => ref.current.pause());
    }

    return (
    <div>
        <h1>Level 1</h1>
        <button onClick = {onPlay}>Play</button>
        <button onClick={onPause}>Pause</button>
        <button onClick={uploadBlob}>Upload</button>
    </div>
    );
}

export default App;