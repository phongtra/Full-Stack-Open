import React from 'react';

const Statistics = ({
  good,
  neutral,
  bad,
  renderAverage,
  renderPercentage
}) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return <p>No feedbacks given</p>;
  }
  return (
    <div>
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
