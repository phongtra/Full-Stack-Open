import React, { useState } from 'react';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [point, setPoint] = useState(
    Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0)
  );
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>
        next anecdote
      </button>
      <button
        onClick={() => {
          const copy = [...point];
          copy[selected]++;
          setPoint(copy);
        }}
      >
        vote
      </button>
      <p>has {point[selected]} votes</p>
    </div>
  );
};

export default App;
