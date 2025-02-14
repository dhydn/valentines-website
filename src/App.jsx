import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function PulseHeart() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="text-danger"
      >
        <Heart size={80} className="fill-current text-danger" />
      </motion.div>
    </div>
  );
}

function JumpingButton({ onComplete }) {
  const [clicks, setClicks] = useState(0);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const buttonTexts = [
    "Click me!",
    "Almost there!",
    "Try again!",
    "You can do it!",
    "Final click!",
  ];

  const moveButton = () => {
    if (clicks < 4) {
      // Move button to a random position
      setPosition({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      });
      setClicks(clicks + 1);
    } else {
      // Last click, fade out and show main content
      onComplete();
    }
  };

  return (
    <motion.button
      className="btn custom-btn position-absolute"
      style={{ top: position.top, left: position.left, position: "absolute" }}
      onClick={moveButton}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale:0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {buttonTexts[clicks]}
    </motion.button>
  );
}

function MainContent() {
  const topImages = [
    "images/1.png",
    "images/2.JPG",
    "images/3.jpeg",
    "images/4.JPG",
    "images/5.JPG",
    "images/6.JPG",
  ]; // Top row images

  const bottomImages = [
    "images/7.JPG",
    "images/8.JPG",
    "images/9.JPG",
    "images/10.JPG",
    "images/11.JPG",
    "images/12.JPG",
  ]; // Bottom row images

  return (
    <motion.div
      className="main-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Top Row - Moves Left */}
      <div className="scrolling-container">
        <div className="image-row top-row">
          {[...topImages, ...topImages].map((src, index) => (
            <img key={index} src={src} alt="Top Border" />
          ))}
        </div>
      </div>

      {/* Centered Text */}
      <div className="centered-content">
        <h1>will you be my valentine &lt;3</h1>
      </div>

      {/* Bottom Row - Moves Right */}
      <div className="scrolling-container">
        <div className="image-row bottom-row">
          {[...bottomImages, ...bottomImages].map((src, index) => (
            <img key={index} src={src} alt="Bottom Border" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
    


function App() {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonComplete = () => {
    setShowButton(false); 
    setTimeout(() => {
      setShowMainContent(true);
    }, 500); 
  };

  return (
    <>
      {loading ? (
        <PulseHeart />
      ) : showButton ? (
        <JumpingButton onComplete={handleButtonComplete} />
      ) : showMainContent ? (
        <MainContent />
      ) : null}
    </>
  );
}

export default App
