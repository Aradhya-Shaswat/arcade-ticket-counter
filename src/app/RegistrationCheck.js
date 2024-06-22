// src/app/RegistrationCheck.js

import { useState } from 'react';

const RegistrationCheck = ({ onRegistered }) => {
  const [isRegistered, setIsRegistered] = useState(null);

  const handleYes = () => {
    setIsRegistered(true);
    onRegistered(true);
  };

  const handleNo = () => {
    setIsRegistered(false);
    window.location.href = 'https://hackclub.com/register'; // Replace with your registration link
  };

  return (
    <div className="registration-check">
      <h2>Have you registered for the HackClub?</h2>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
};

export default RegistrationCheck;
