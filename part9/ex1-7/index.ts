import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});
app.use(bodyParser.json());
app.get('/bmi', (req, res) => {
  const { height, mass } = req.query;

  if (!height || !mass || isNaN(Number(height)) || isNaN(Number(mass))) {
    res.status(400).send({ error: 'Malformatted parameters' });
  } else
    res.send({
      height,
      mass,
      bmi: bmiCalculator(height, mass)
    });
});
app.post('/exercise', (req, res) => {
  const { daily_exercises, target } = req.body;
  let invalidDailyHour = false;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'Missing parameters' });
  } else {
    if (typeof daily_exercises !== 'object') {
      res.status(400).send({ error: 'Malformatted parameter' });
    } else {
      for (const day of daily_exercises) {
        if (typeof day !== 'number') {
          invalidDailyHour = true;
          break;
        }
      }
      if (invalidDailyHour || typeof target !== 'number') {
        res.status(400).send({ error: 'Malformatted parameter' });
      } else {
        res.send(exerciseCalculator(daily_exercises, target));
      }
    }
  }
});
app.listen(4000);
