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
    window.location.href = 'https://hackclub.com/arcade/';
  };

  return (
    <div className="registration-check">
      <h3>Have you registered for <u>Hack Club's</u> <span className={showAnimation ? 'arcade' : ''}>'Arcade'</span></h3>
      <button className='checkButton' onClick={handleYes}>1 ( yes! )</button>
      <button className='checkButton1' onClick={handleNo}>{`0 ( no :< )`}</button>
      
    </div>
  );
};

export default RegistrationCheck;
