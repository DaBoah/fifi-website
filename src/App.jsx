import { useState, useRef, useMemo } from 'react'
import './App.css'

// Music
import monkeySound from './music/dancemonkey.mp3'
import realSongSound from './music/mazaak.mp3'

// Images
import cat0 from './images/cutecat.png'
import cat1 from './images/cat1.jpg'
import cat2 from './images/thinkingcat.png'
import cat3 from './images/catscared.png'
import cat4 from './images/relievedcat.png'
import cat5 from './images/cat2.jpeg'
import cat6 from './images/flowercat.png'
import heartImg from './images/pinkheart.png'
import noteImg from './images/note.jpg'

function App() {
  const [step, setStep] = useState(0);
  const [showNote, setShowNote] = useState(false); 

  // Use the imported sound variables
  const danceMonkeyRef = useRef(new Audio(monkeySound)); 
  const realSongRef = useRef(new Audio(realSongSound));      

  const messages = [
    "Psst... Fifi.",                      
    "Yeah you. Cutie.",                   
    "Wait, let me get the music first...", 
    "OH GOD WRONG SONG-",                 
    "Okay... let's try that again.",      
    "I got you a little something.",      
    "Your favorites, my princess <3"      
  ];

  const catImages = [cat0, cat1, cat2, cat3, cat4, cat5, cat6];

  const hearts = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,        
      duration: 3 + Math.random() * 3,  
      delay: Math.random() * 5          
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
      
      {/* FALLING HEARTS */}
      {step === 6 && (
        <div className="hearts-container">
          {hearts.map((heart) => (
            <img 
              key={heart.id}
              src={heartImg} 
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
              src={noteImg}
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