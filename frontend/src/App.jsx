import './App.css'
import {useState, useEffect, useRef} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChooseInstrumentsPage from './ChooseInstruments'

function App() {
  const audioRef = useRef(null);

  const onPlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/test_audio.mp3");
    }
    audioRef.current.play().catch((err) => {
      console.error("Audio ERROR:", err);
    });
  };

  const onPause = () => {
    audioRef.current?.pause();
  };

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

  return (
    <>
      <button onClick = {onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={uploadBlob}>Upload</button>
      <BrowserRouter>
        <Routes>
          <Route path="/choose-instrument" element={<ChooseInstrumentsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
