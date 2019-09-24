import React, { useState } from 'react';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>
        next anecdote
      </button>
    </div>
  );
};

export default App;
