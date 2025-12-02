import React from 'react';
import {useEffect, useRef, useState} from 'react';

function LevelOnePage() {
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

    async function uploadBlob() {
        // Fetch the same audio file you're playing
        const audioResponse = await fetch("/test_audio.mp3");
        const audioBlob = await audioResponse.blob();

        const formData = new FormData();
        formData.append("audio_data", audioBlob, "test_audio.mp3");
        formData.append("type", "mp3");

        const apiUrl = "https://humble-goggles-94pr9r69rwwc9ppp-5000.app.github.dev/upload/audio";

        const response = await fetch(apiUrl, {
            method: "POST",
            cache: "no-cache",
            body: formData,
        });
        const json = await response.json();
        console.log(json);
    }


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

export default LevelOnePage;

//load files
//compressed files are loaded, and once they load, the user can start listening to different options
//and they have to guess which one matches the ratio they're asked

//instead of levelOne.jsx, it should be one level page for all react
//and it is dynamic based on the user info