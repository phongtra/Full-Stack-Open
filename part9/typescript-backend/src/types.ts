export interface IDiagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface IPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface IPublicPatient extends Omit<IPatient, 'ssn' | 'entries'> {}

export interface IPatientExcludeId extends Omit<IPatient, 'id'> {}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<IDiagnose['code']>;
}
export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}
interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: HospitalDischarge;
}
export interface HospitalDischarge {
  date: string;
  criteria: string;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}
export interface SickLeave {
  startDate: string;
  endDate: string;
}
export type HospitalEntryForm = Omit<HospitalEntry, 'id'>;
export type OccupationalHealthcareEntryForm = Omit<
  OccupationalHealthcareEntry,
  'id'
>;
export type HealthCheckEntryForm = Omit<HealthCheckEntry, 'id'>;
export type EntryForm =
  | HealthCheckEntryForm
  | HospitalEntryForm
  | OccupationalHealthcareEntryForm;
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
