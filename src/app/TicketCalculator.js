import React, { useState } from 'react';

const TicketCalculator = () => {
  const [step, setStep] = useState(1);
  const [currentTickets, setCurrentTickets] = useState('');
  const [ticketsNeeded, setTicketsNeeded] = useState('');
  const [workingDays, setWorkingDays] = useState('');
  const [daysLeft, setDaysLeft] = useState(0); // State to hold days left
  const [output, setOutput] = useState('');
  const [showShareBox, setShowShareBox] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false); // State to track if link is copied

  const handleSubmitCurrentTickets = (e) => {
    e.preventDefault();
    if (!currentTickets || isNaN(currentTickets)) {
      alert('Please enter a valid number of current tickets.');
      return;
    }
    setStep(2);
  };

  const handleSubmitTicketsNeeded = (e) => {
    e.preventDefault();
    if (!ticketsNeeded || isNaN(ticketsNeeded)) {
      alert('Please enter a valid number of tickets needed.');
      return;
    }
    setStep(3);
    calculateDaysLeft(); // Calculate days left after moving to step 3
  };

  const handleSubmitWorkingDays = (e) => {
    e.preventDefault();
    if (!workingDays || isNaN(workingDays)) {
      alert('Please enter a valid number of days you can work.');
      return;
    }
    if (workingDays > daysLeft) {
      alert(`You cannot enter more than ${daysLeft} days.`);
      return;
    }
    calculate(); // Calculate the result after entering working days
  };

  const calculateDaysLeft = () => {
    const currentDate = new Date();
    const endDate = new Date('2024-08-31');
    const msLeft = endDate - currentDate;
    const daysRemaining = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    setDaysLeft(daysRemaining);
  };

  const calculate = () => {
    const ticketsRemaining = ticketsNeeded - currentTickets;
    const ticketsPerDay = ticketsRemaining / workingDays;

    // Calculate hours and minutes required
    let hoursRequired = Math.floor(ticketsPerDay); // Whole hours
    let minutesRequired = Math.round((ticketsPerDay - hoursRequired) * 60); // Remaining minutes

    // Check if goal has already been achieved
    if (hoursRequired <= 0 && minutesRequired <= 0) {
      setOutput(`congratulations! you have already completed your goal! 🎉`);
    } else if (hoursRequired >= 24 || (hoursRequired < 0 && minutesRequired < 0)) {
      setOutput(`:< sorry, but it is mathematically impossible to achieve that goal! 😔`);
    } else {
      setOutput(`you need to complete approximately ${ticketsPerDay.toFixed(1)} tickets per day, which is ${hoursRequired} hours and ${minutesRequired} minutes per day!`);
    }

    setShowShareBox(true);
  };

  const handleShareClick = () => {
    const shareText = ``; // Replace with your desired link
    navigator.clipboard.writeText(shareText).then(() => {
      setLinkCopied(true);
    });
  };

  return (
    <div className="ticket-calculator-form">
      {step === 1 && (
        <form onSubmit={handleSubmitCurrentTickets}>
          <div className="form-group">
            <label>How many tickets do you currently have?</label>
            <input
              type="number"
              value={currentTickets}
              onChange={(e) => setCurrentTickets(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="calculate-button">Next➡️</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmitTicketsNeeded}>
          <div className="form-group">
            <label>How many tickets do you want to achieve?</label>
            <input
              type="number"
              value={ticketsNeeded}
              onChange={(e) => setTicketsNeeded(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="calculate-button">Next➡️</button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleSubmitWorkingDays}>
          <p><b>{daysLeft}</b> Days remaining until Event End!</p>
          <div className="form-group">
            <label>Out of that, how many days can you work? </label>
            <input
              type="number"
              value={workingDays}
              onChange={(e) => setWorkingDays(e.target.value)}
              max={daysLeft} // Limit input to daysLeft
              required
            />
          </div>
          <button type="submit" className="calculate-button"><b>CALCULATE!</b></button>
        </form>
      )}
      {output && (
        <div className="output">
          <p>{output}</p>
        </div>
      )}
      {showShareBox && (
        <div className="share-box" onClick={handleShareClick}>
          <p style={{ textDecoration: 'underline', cursor: 'pointer' }}>Share with others!</p>
          {linkCopied && <p style={{ color: 'green' }}>Link copied to clipboard!</p>}
        </div>
      )}
    </div>
  );
};

export default TicketCalculator;
