import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';

const OccupationalEntryDetail: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name="stethoscope" />
          </Card.Header>
          <Card.Meta>{entry.description}</Card.Meta>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default OccupationalEntryDetail;
