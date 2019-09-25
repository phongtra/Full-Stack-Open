import React from 'react';
import Content from './Content';

const Header = ({ course }) => <h1>{course}</h1>;

// const Total = ({parts}) => {
//   const total =

//   return <p>yhteensä {total} tehtävää</p>;
// };

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/* <Total parts={course.parts} /> */}
    </div>
  );
};

export default Course;
