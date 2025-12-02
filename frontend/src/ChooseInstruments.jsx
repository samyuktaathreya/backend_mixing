import React from 'react';
import {useRef} from 'react';

function ChooseInstrumentsPage() { 
    const guitar = useRef(new Audio("/project 1 guitar.mp3"));
    const bass = useRef(new Audio("/project 1 bass.mp3"));
    const drums = useRef(new Audio("/project 1 drums.mp3"));
    const pads = useRef(new Audio("/project 1 pads.mp3"));
    const vox = useRef(new Audio("/project 1 vocals.mp3"));
    const mutedMaster = useRef(new Audio("/project 1 muted.mp3"));

    function playInstrument(instrument) {
        if (mutedMaster.current.paused) {
            mutedMaster.current.play();
            instrument.current.play();
        }
        else 
        {
            instrument.current.currentTime = mutedMaster.current.currentTime;
            instrument.current.play();
        }
    }

    return (
    <div>
        <h1>Choose which instruments you want to hear.</h1>

        <button onClick={() => playInstrument(guitar)}>Guitar</button>
        <button onClick={() => playInstrument(bass)}>Bass</button>
        <button onClick={() => playInstrument(drums)}>Drums</button>
        <button onClick={() => playInstrument(pads)}>Synth Pads</button>
        <button onClick={() => playInstrument(vox)}>Vocals</button>
    </div>
    );
}

export default ChooseInstrumentsPage;