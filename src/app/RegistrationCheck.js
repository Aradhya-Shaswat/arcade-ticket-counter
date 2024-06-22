// src/app/RegistrationCheck.js

import { useState, useEffect } from 'react';


const RegistrationCheck = ({ onRegistered }) => {
  const [isRegistered, setIsRegistered] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false); // State to trigger animation

  useEffect(() => {
    setShowAnimation(true); // Trigger animation on component mount
  }, []);


  const handleYes = () => {
    setIsRegistered(true);
    onRegistered(true);
  };

  const handleNo = () => {
    setIsRegistered(false);
    window.location.href = 'https://hackclub.com/arcade/'; // Replace with your registration link
  };

  return (
    <div className="registration-check">
      <h3>Have you registered for HackClub's <span className={showAnimation ? 'arcade' : ''}>'Arcade'</span></h3>
      <button onClick={handleYes}>1</button>
      <button onClick={handleNo}>0</button>
      
    </div>
  );
};

export default RegistrationCheck;
