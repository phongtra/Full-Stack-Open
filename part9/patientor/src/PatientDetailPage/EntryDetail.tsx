import React from 'react';
import { Entry } from '../types';
import HealthCheckEntryDetail from './HeathCheckEntryDetail';
import HospitalEntryDetail from './HospitalEntryDetail';
import OccupationalEntryDetail from './OccupationalEntryDetail';

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error('Invalid Type');
  };
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetail entry={entry} />;
    case 'Hospital':
      return <HospitalEntryDetail entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntryDetail entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;
