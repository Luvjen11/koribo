import { useState } from "react";
import "../styles/Flashcard.css"

function Flashcard({ word, translation }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="wrapper" onClick={() => setFlipped(!flipped)}>
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        <div className="front card">
          <h3 className="word">{word}</h3>
        </div>
        <div className="back card">
          <h3 className="translation">{translation}</h3>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;