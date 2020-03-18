import React from 'react';
import { CoursePart } from './types';
import Part from './Part';

interface IProps {
  courseParts: CoursePart[];
}

const Content: React.FC<IProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map(course => (
        <Part course={course} />
      ))}
    </>
  );
};

export default Content;
