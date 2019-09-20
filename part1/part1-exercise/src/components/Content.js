import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ name, exercise }) => {
        return <Part part={name} exercise={exercise} />;
      })}
    </div>
  );
};

export default Content;
