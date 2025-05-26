import { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const speak = (text) => {
  const synth = window.speechSynthesis;
  const utter = new window.SpeechSynthesisUtterance(text);
  synth.speak(utter);
};

const VoiceInput = ({ onText, onFeedback, helperMessage }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onText(transcript);
      setIsListening(false);
    };
    recognition.onerror = (event) => {
      speak('Sorry, I did not catch that. Please try again.');
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  };

  if (onFeedback) onFeedback(speak);

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <button
        onClick={startListening}
        disabled={isListening}
        style={{
          padding: '10px',
          background: isListening ? '#ccc' : '#0070f3',
          color: 'white',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          border: 'none',
          outline: 'none',
          cursor: 'pointer'
        }}
        title={isListening ? 'Listening...' : 'Speak Command'}
      >
        <FaMicrophone />
      </button>
      {/* Helper message always visible */}
      {helperMessage && (
        <span style={{ marginTop: 8, color: '#0070f3', fontSize: 14, textAlign: 'center', maxWidth: 180 }}>
          {helperMessage}
        </span>
      )}
      {/* Listening message only when active */}
      {isListening && (
        <span style={{ marginTop: 4, color: 'green', fontWeight: 'bold', fontSize: 14 }}>
          Listening... Please say the product and quantity!
        </span>
      )}
    </div>
  );
};

export default VoiceInput;