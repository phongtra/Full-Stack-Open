import React from 'react';

const Search = ({ text, onChange }) => {
  return (
    <div>
      find countries <input value={text} onChange={onChange} />
    </div>
  );
};

export default Search;
