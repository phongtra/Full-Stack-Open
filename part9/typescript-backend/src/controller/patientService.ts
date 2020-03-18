import patientData from '../data/patients';
import {
  IPublicPatient,
  IPatient,
  IPatientExcludeId,
  HospitalEntryForm,
  OccupationalHealthcareEntryForm,
  HealthCheckEntryForm,
  EntryForm
} from '../types';
import { v4 as uuid } from 'uuid';
import utils from '../utils';

const patients: IPatient[] = utils.toPatient(patientData);

const getPatients = (): IPublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
const getPatient = (id: string): IPublicPatient => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    const { ssn, ...returnPatient } = patient;
    return { ...returnPatient };
  }
  throw new Error('no patient found');
};
const addPatient = (patient: IPatientExcludeId): IPatient => {
  const newPatient = { id: uuid(), ...patient, entries: [] };
  patients.push(newPatient);
  return newPatient;
};
const entryHelper = (entry: EntryForm, id: string): IPatient => {
  const newEntry = { id: uuid(), ...entry };
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error('id not found');
  }
  patient.entries.push(newEntry);
  return patient;
};
const addHospitalEntry = (id: string, entry: HospitalEntryForm): IPatient => {
  return entryHelper(entry, id);
};
const addOccupationalEntry = (
  id: string,
  entry: OccupationalHealthcareEntryForm
): IPatient => {
  if (!entry.sickLeave) {
    const { sickLeave, ...entryWithoutSickLeave } = entry;
    return entryHelper(entryWithoutSickLeave, id);
  }
  return entryHelper(entry, id);
};
const addHealthCheclEntry = (
  id: string,
  entry: HealthCheckEntryForm
): IPatient => {
  return entryHelper(entry, id);
};
export default {
  getPatients,
  addPatient,
  getPatient,
  addHospitalEntry,
  addOccupationalEntry,
  addHealthCheclEntry
};
