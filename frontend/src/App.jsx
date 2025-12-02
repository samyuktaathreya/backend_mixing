import './App.css'
import {useState, useEffect, useRef} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChooseInstrumentsPage from './ChooseInstruments'
import LevelOnePage from './LevelOne';

function App() {
  const audioRef = useRef(null);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/choose-instrument" element={<ChooseInstrumentsPage />} />
          <Route path="/level-one" element={<LevelOnePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
