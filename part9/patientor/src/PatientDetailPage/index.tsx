import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useStateValue, getPatient } from '../state';
import Axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Icon, Button, Modal, Segment } from 'semantic-ui-react';
import EntryDetail from './EntryDetail';
import EntryFormComponent from './EntryForm';

const PatientDetailPage: React.FC<RouteComponentProps<{ id: string }>> = ({
  match
}) => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  React.useEffect(() => {
    if (patient.id !== match.params.id) {
      const fetchPatient = async () => {
        try {
          const { data: patient } = await Axios.get<Patient>(
            `${apiBaseUrl}/patients/${match.params.id}`
          );
          dispatch(getPatient(patient));
        } catch (e) {
          console.log(e);
        }
      };
      fetchPatient();
    }
  }, [patient, dispatch, match]);
  return (
    <div>
      <Header>
        {patient.name} <Icon name={patient.gender as any} />
      </Header>
      <p>{patient.dateOfBirth}</p>
      <p>{patient.occupation}</p>
      {patient.entries.length > 0 &&
        patient.entries.map((entry, i) => (
          <EntryDetail key={i} entry={entry} />
        ))}
      <br />
      <Button onClick={openModal}>Add new Health Entry</Button>
      <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
        <Modal.Header>Add a new patient</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <EntryFormComponent id={match.params.id} closeModal={closeModal} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default PatientDetailPage;
