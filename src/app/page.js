// src/app/page.js
'use client'
import React, { useState, useEffect } from 'react';
import RegistrationCheck from './RegistrationCheck';
import TicketCalculator from './TicketCalculator';

export default function HomePage() {
  const [registered, setRegistered] = useState(false);
  const [hasCheckedRegistration, setHasCheckedRegistration] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false); // State to trigger animation

  useEffect(() => {
    setShowAnimation(true); // Trigger animation on component mount
  }, []);

  const handleRegistrationStatus = (status) => {
    setRegistered(status);
    setHasCheckedRegistration(true);
  };

  return (
    <div className="home-page">
      {!hasCheckedRegistration ? (
        <RegistrationCheck onRegistered={handleRegistrationStatus} />
      ) : registered ? (
        <div>
          <h1>Arsh's <span className={showAnimation ? 'ticket-day' : ''}>'Ticket/Day'</span> Calculator</h1>
          <TicketCalculator />
        </div>
      ) : (
        <div className="redirecting">
          <h2>Redirecting to registration page...</h2>
        </div>
      )}
    </div>
  );
}
