import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import {
  TextField,
  DiagnosisSelection,
  NumberField
} from '../AddPatientModal/FormField';
import { HealthCheckEntryForm, HealthCheckRating, Patient } from '../types';
import { useStateValue, addEntry } from '../state';
import Axios from 'axios';
import { apiBaseUrl } from '../constants';

const EntryFormComponent: React.FC<{ id: string; closeModal: () => void }> = ({
  id,
  closeModal
}) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  const onSubmit = async (entry: HealthCheckEntryForm) => {
    try {
      const { data: patientWithNewEntry } = await Axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      dispatch(addEntry(patientWithNewEntry));
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          type: 'HealthCheck',
          description: '',
          date: '',
          specialist: '',
          diagnosisCodes: [],
          healthCheckRating: HealthCheckRating.Healthy
        }}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              <Grid>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EntryFormComponent;
