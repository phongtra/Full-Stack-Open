import diagnoseData from '../data/diagnoses.json';
import { IDiagnose } from '../types';

const diagnoses: IDiagnose[] = diagnoseData;

const getDiagnoses = (): IDiagnose[] => {
  return diagnoses;
};

export default { getDiagnoses };
