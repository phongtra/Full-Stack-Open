import express from 'express';
import patientService from '../controller/patientService';
import utils from '../utils';
import { HospitalDischarge, SickLeave } from '../types';
const router = express.Router();
const instanceOfHospitalDischarge = (
  object: any
): object is HospitalDischarge => {
  return 'date' in object && 'criteria' in object;
};
const instanceOfSickLeave = (object: any): object is SickLeave => {
  if (!object) return true;
  return 'startDate' in object && 'endDate' in object;
};

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});
router.get('/:id', (req, res) => {
  try {
    res.send(patientService.getPatient(req.params.id));
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});
router.post('/', (req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  if (!name || !ssn || !dateOfBirth || !occupation || !gender) {
    res.status(400).send({ error: 'Missing parameters' });
  } else {
    const toNewPatientEntry = utils.toNewPatient(req.body);
    const newPatient = patientService.addPatient(toNewPatientEntry);
    res.send(newPatient);
  }
});

router.post('/:id/entries', (req, res) => {
  const { description, date, specialist, diagnosisCodes, type } = req.body;
  if (!description || !date || !specialist || !diagnosisCodes || !type) {
    res.status(400).send({ error: 'Missing parameters' });
  } else {
    switch (type) {
      case 'Hospital':
        if (
          !req.body.discharge ||
          !instanceOfHospitalDischarge(req.body.discharge)
        ) {
          res.status(400).send({
            error: 'Missing parameters or wrong formatted parameters'
          });
        } else {
          res.send(
            patientService.addHospitalEntry(req.params.id, {
              type,
              description,
              date,
              specialist,
              diagnosisCodes,
              discharge: req.body.discharge
            })
          );
        }
        break;
      case 'HealthCheck':
        if (typeof req.body.healthCheckRating !== 'number') {
          res.status(400).send({
            error: 'Missing parameters or wrong formatted parameters'
          });
        } else {
          res.send(
            patientService.addHealthCheclEntry(req.params.id, {
              type,
              description,
              date,
              specialist,
              diagnosisCodes,
              healthCheckRating: req.body.healthCheckRating
            })
          );
        }
        break;
      case 'OccupationalHealthcare':
        if (
          !req.body.employerName ||
          !instanceOfSickLeave(req.body.sickLeave)
        ) {
          res.status(400).send({
            error: 'Missing parameters or wrong formatted parameters'
          });
        } else {
          res.send(
            patientService.addOccupationalEntry(req.params.id, {
              type,
              description,
              date,
              specialist,
              diagnosisCodes,
              employerName: req.body.employerName,
              sickLeave: req.body.sickLeave || undefined
            })
          );
        }
        break;
      default:
        res.status(400).send({ error: 'Wrong type' });
    }
  }
});

export default router;
