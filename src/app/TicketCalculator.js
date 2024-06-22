import React, { useState } from 'react';
const TicketCalculator = () => {
  const [step, setStep] = useState(1);
  const [currentTickets, setCurrentTickets] = useState('');
  const [ticketsNeeded, setTicketsNeeded] = useState('');
  const [workingDays, setWorkingDays] = useState('');
  const [daysLeft, setDaysLeft] = useState(0); // State to hold days left
  const [output, setOutput] = useState('');

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

    setOutput(`You need to complete approximately ${ticketsPerDay.toFixed(2)} tickets per day.`);
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
          <button type="submit" className="calculate-button">Next</button>
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
          <button type="submit" className="calculate-button">Next</button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleSubmitWorkingDays}>
          <p><b>{daysLeft}</b> Days remaining until Event End!</p>
          <div className="form-group">
            <label>Out of that, how many days can you work?</label>
            <input
              type="number"
              value={workingDays}
              onChange={(e) => setWorkingDays(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="calculate-button">Calculate</button>
        </form>
      )}
      {output && (
        <div className="output">
          <p>Result:</p>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default TicketCalculator;
