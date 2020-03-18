interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function exerciseCalculator(training: number[], target: number): Result {
  let count = 0;
  let sum = 0;
  for (const day of training) {
    if (day > 0) {
      count++;
    }
    sum += day;
  }
  const average = sum / training.length;
  let rating: number;
  if (average < target - 1) {
    rating = 1;
  } else if (average >= target - 1 && average < target) {
    rating = 2;
  } else {
    rating = 3;
  }
  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = 'You need to try harder';
      break;
    case 2:
      ratingDescription = 'Not too bad but could be better';
      break;
    default:
      ratingDescription = 'You reached your goal';
  }
  return {
    periodLength: training.length,
    trainingDays: count,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
}
// const target = parseInt(process.argv.slice(2)[0]) || null;
// const training = process.argv.slice(3);
// let inValidTraining = false;
// const trainingProgram: number[] = [];
// for (const day of training) {
//   if (isNaN(Number(day))) {
//     inValidTraining = true;
//     break;
//   }
//   trainingProgram.push(Number(day));
// }
// if (!target) {
//   console.log('Target must be a number');
// } else if (inValidTraining) {
//   console.log('Training must be numbers');
// } else console.log(exerciseCalculator(trainingProgram, target));
