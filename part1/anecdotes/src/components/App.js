import React, { useState } from 'react';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [point, setPoint] = useState([0, 0, 0, 0, 0, 0]);

  const renderMax = () => {
    let max = 0;
    let text;
    point.forEach((value, index) => {
      if (value > max) {
        max = value;
      }
      if (value === max) {
        text = anecdotes[index];
      }
    });
    return (
      <>
        <p>{text}</p>
        <p>has {max} vote</p>
      </>
    );
  };
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
      <h1>Anecdote with the most vote</h1>
      {renderMax()}
    </div>
  );
};

export default App;
