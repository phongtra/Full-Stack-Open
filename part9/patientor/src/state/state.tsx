import React, { createContext, useContext, useReducer } from 'react';
import { Patient, Diagnosis, Gender } from '../types';

import { Action } from './reducer';

export type State = {
  patients: { [id: string]: Patient };
  patient: Patient;
  diagnoses: Diagnosis[];
};

const initialState: State = {
  patients: {},
  patient: {
    id: '',
    name: '',
    occupation: '',
    gender: Gender.Other,
    ssn: '',
    dateOfBirth: '',
    entries: []
  },
  diagnoses: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
export const getPatients = (payload: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload };
};
export const getPatient = (payload: Patient): Action => {
  return { type: 'GET_PATIENT', payload };
};
export const addPatient = (payload: Patient): Action => {
  return { type: 'ADD_PATIENT', payload };
};
export const getDiagnoses = (payload: Diagnosis[]): Action => {
  return { type: 'GET_DIAGNOSES', payload };
};
export const addEntry = (payload: Patient): Action => {
  return { type: 'ADD_ENTRY', payload };
};
