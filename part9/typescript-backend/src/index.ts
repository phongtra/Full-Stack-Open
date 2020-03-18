import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import diagnoseRoute from './routes/diagnoseRoute';
import patientRoute from './routes/patientRoute';
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/patients', patientRoute);
app.use('/api/diagnoses', diagnoseRoute);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(3001);
