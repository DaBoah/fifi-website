// src/App.jsx
import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState(0);
  const [showNote, setShowNote] = useState(false); 

  // TWO Audio Refs
  const danceMonkeyRef = useRef(new Audio('/music/dancemonkey.mp3')); // The joke song
  const realSongRef = useRef(new Audio('/music/mazaak.mp3'));      // The real song

  const messages = [
    "Psst... Fifi.",                      // Step 0
    "Yeah you. Cutie.",                   // Step 1
    "Wait, let me get the music goin...", // Step 2 (Dance monkey plays)
    "OH GOD WRONG SONG-",             // Step 3 
    "Okay... let's try that again.",   // Step 4 (Real song starts)
    "I got you a little something.",      // Step 5
    "Your favorites, my princess <3"      // Step 6 (Flowers appear)
  ];

  const catImages = [
    "/images/cutecat.png",       // Normal
    "/images/cat1.jpg",       // Cute/Happy
    "/images/thinkingcat.png",       // Focused 
    "/images/catscared.png",    // SHOCKED CAT 
    "/images/relievedcat.png",   // Relieved
    "/images/cat2.jpeg",   // Cute again
    "/images/flowercat.png"   // The Final Flower Cat
  ];

  const handleInteraction = () => {
    // We update step first, then check what logic to run for the NEW step
    const nextStep = step + 1;
    
    // --- MUSIC LOGIC ---
    
    // Trigger 1: The Fake Out (When moving TO Step 3)
    if (nextStep === 2) {
      danceMonkeyRef.current.volume = 0.5;
      danceMonkeyRef.current.play().catch(e => console.log("Monkey failed:", e));
    }

    // Trigger 2: The Fix (When moving TO Step 4)
    if (nextStep === 4) {
      danceMonkeyRef.current.pause();       // Kill the monkey
      danceMonkeyRef.current.currentTime = 0; // Reset it
      
      realSongRef.current.volume = 0.4;     // Start the real vibes
      realSongRef.current.loop = true;
      realSongRef.current.play().catch(e => console.log("Real song failed:", e));
    }

    // Advance the conversation (unless we are at the end)
    if (step < messages.length - 1) {
      setStep(nextStep);
    }
  };

  return (
    <div className="container">
      
      <div className={`main-content ${showNote ? 'blur-background' : ''}`}>
        
        <div className="chat-bubble" onClick={handleInteraction}>
          <p style={{ color: 'black', margin: 0, fontWeight: 'bold' }}>
            {messages[step]}
          </p>
        </div>

        <img 
          src={catImages[step]} 
          alt="Cute cat" 
          className="cat-image"
          onClick={handleInteraction}
        />

        {step === messages.length - 1 && (
          <button 
            className="open-btn" 
            onClick={() => setShowNote(true)}> 
            Open Note 💌
          </button>
        )}
      </div>

      {showNote && (
        <div className="note-overlay" onClick={() => setShowNote(false)}>
          <div className="note-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src="/images/note.jpg" 
              alt="Handwritten note" 
              className="note-image"
            />
            <button className="close-btn" onClick={() => setShowNote(false)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default App