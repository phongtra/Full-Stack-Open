import React from 'react';
import { CoursePart } from './types';

interface IProps {
  course: CoursePart;
}

const Part: React.FC<IProps> = ({ course }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (course.name) {
    case 'Fundamentals':
      return (
        <p>
          {course.name} {course.description} {course.exerciseCount}
        </p>
      );

    case 'Deeper type usage':
      return (
        <p>
          {course.name} {course.description} {course.exerciseCount}{' '}
          {course.exerciseSubmissionLink}
        </p>
      );

    case 'Using props to pass data':
      return (
        <p>
          {course.name} {course.exerciseCount} {course.groupProjectCount}
        </p>
      );
    case 'Phong':
      return (
        <p>
          {course.name} {course.exerciseCount} {course.description}
        </p>
      );

    default:
      return assertNever(course);
  }
};

export default Part;
