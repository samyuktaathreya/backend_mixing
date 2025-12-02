import React from 'react';
import {useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";

function ChooseInstrumentsPage() { 
    const navigate = useNavigate();


    const [selected, setSelected] = React.useState({
        guitar: false,
        bass: false,
        drums: false,
        pads: false,
        vocals: false
    });

    function toggle(name) {
        setSelected(prev => ({
        ...prev,
        [name]: !prev[name]
        }));
    }

    function startLevel() {
        localStorage.setItem("instruments", JSON.stringify(selected));
        navigate("/level-one");
    }

    return (
        <div>
        {["guitar", "bass", "drums", "pads","vocals"].map(name => (
            <button
                key={name}
                onClick={() => toggle(name)}
                style={{
                    backgroundColor: selected[name] ? "green" : "white",
                    color: "black",
                    margin: 10
                }}
                >
                {name}
            </button>
        ))}

        <button onClick={() => startLevel()}>
            Start Level
        </button>
        </div>
    );
}

export default ChooseInstrumentsPage;