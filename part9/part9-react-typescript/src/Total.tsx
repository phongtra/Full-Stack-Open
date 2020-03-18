import React from 'react';
import { CoursePart } from './types';

interface IProps {
  courseParts: CoursePart[];
}

const Total: React.FC<IProps> = ({ courseParts }) => {
  return (
    <>
      <p>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
};

export default Total;
