import React, { useState } from 'react';

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

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>netral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + bad + neutral}</p>
      <p>average {renderAverage()}</p>
      <p>percentage {renderPercentage()}</p>
    </>
  );
};

export default App;
