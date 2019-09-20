import React from 'react';

const Statistics = ({
  good,
  neutral,
  bad,
  renderAverage,
  renderPercentage
}) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + bad + neutral}</p>
      <p>average {renderAverage()}</p>
      <p>percentage {renderPercentage()}</p>
    </div>
  );
};

export default Statistics;
