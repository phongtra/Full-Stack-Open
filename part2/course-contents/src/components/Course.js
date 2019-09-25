import React from 'react';
import Content from './Content';

const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => {
    return a + b.exercises;
  }, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
