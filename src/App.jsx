// src/App.jsx
import { useState, useRef, useMemo } from 'react' // <--- Added useMemo
import './App.css'

function App() {
  const [step, setStep] = useState(0);
  const [showNote, setShowNote] = useState(false); 

  // TWO Audio Refs
  const danceMonkeyRef = useRef(new Audio('music/dancemonkey.mp3')); 
  const realSongRef = useRef(new Audio('music/mazaak.mp3'));      

  const messages = [
    "Psst... Fifi.",                      // 0
    "Yeah you. Cutie.",                   // 1
    "Wait, let me get the music first...", // 2
    "OH GOD WRONG SONG-",                 // 3 
    "Okay... let's try that again.",      // 4
    "I got you a little something.",      // 5
    "Your favorites, my princess <3"      // 6 (Hearts trigger here)
  ];

  const catImages = [
    "images/cutecat.png",       
    "images/cat1.jpg",       
    "images/thinkingcat.png",       
    "images/catscared.png",    
    "images/relievedcat.png",   
    "images/cat2.jpeg",   
    "images/flowercat.png"   
  ];

  // Generate random hearts once so they don't reset when opening the note
  const hearts = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,        // Random horizontal position (0-100%)
      duration: 3 + Math.random() * 3,  // Random fall speed (3s to 6s)
      delay: Math.random() * 5          // Random start delay
    }));
  }, []);

  const handleInteraction = () => {
    const nextStep = step + 1;

    if (nextStep === 2) {
      danceMonkeyRef.current.volume = 0.5;
      danceMonkeyRef.current.play().catch(e => console.log("Monkey failed:", e));
    }

    if (nextStep === 4) {
      danceMonkeyRef.current.pause();     
      danceMonkeyRef.current.currentTime = 0; 
      
      realSongRef.current.volume = 0.4;    
      realSongRef.current.loop = true;
      realSongRef.current.play().catch(e => console.log("Real song failed:", e));
    }

    if (step < messages.length - 1) {
      setStep(nextStep);
    }
  };

  return (
    <div className="container">
      
      {/* FALLING HEARTS CONTAINER */}
      {/* Only show on the final step (index 6) */}
      {step === 6 && (
        <div className="hearts-container">
          {hearts.map((heart) => (
            <img 
              key={heart.id}
              src="images/pinkheart.png" 
              className="heart"
              style={{
                left: `${heart.left}%`, 
                animationDuration: `${heart.duration}s`,
                animationDelay: `${heart.delay}s`
              }}
              alt=""
            />
          ))}
        </div>
      )}

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
              src="images/note.jpg" 
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