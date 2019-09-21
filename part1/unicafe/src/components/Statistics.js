import React from 'react';

const Statistics = ({ text, value }) => {
  return (
    <div>
      <p>
        {text} {value}{' '}
      </p>
    </div>
  );
};

export default Statistics;
