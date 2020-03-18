import { IPatientExcludeId, Gender, IPatient } from '../types';

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const parseGender = (gender: any): Gender => {
  if (!isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};
const toPatient = (patients: IPatient[]): IPatient[] => {
  return patients.map((patient: IPatient) => ({
    id: patient.id,
    name: patient.name,
    ssn: patient.ssn,
    dateOfBirth: patient.dateOfBirth,
    occupation: patient.occupation,
    gender: parseGender(patient.gender),
    entries: patient.entries
  }));
};
const toNewPatient = (object: any): IPatientExcludeId => {
  const newPatient: IPatientExcludeId = {
    gender: parseGender(object.gender),
    ...object
  };
  return newPatient;
};

export default { toNewPatient, toPatient };
