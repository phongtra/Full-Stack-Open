import React, { useState } from 'react';
import Statistics from './Statistics';
import Button from './Button';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const renderAverage = () => {
    let positiveSum = good - bad;
    return positiveSum / (good + neutral + bad) || 0;
  };

  const renderPercentage = () => {
    return (good / (good + bad + neutral)) * 100 || 0;
  };

  const renderFeedBack = () => {
    if (good === 0 && neutral === 0 && bad === 0) {
      return <p>No feedbacks given</p>;
    }
    return (
      <div>
        <Statistics text={'good'} value={good} />
        <Statistics text={'neutral'} value={neutral} />
        <Statistics text={'bad'} value={bad} />
        <Statistics text={'average'} value={renderAverage()} />
        <Statistics text={'percentage'} value={renderPercentage()} />
      </div>
    );
  };
  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <h1>statistics</h1>
      {renderFeedBack()}
    </>
  );
};

export default App;
