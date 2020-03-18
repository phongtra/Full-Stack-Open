interface ICourse {
  name: string;
  exerciseCount: number;
}
interface CourseWithDescription extends ICourse {
  description: string;
}
interface CoursePartOne extends CourseWithDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends ICourse {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CourseWithDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour {
  name: 'Phong';
  description: string;
  exerciseCount: number;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
