import React from 'react';
import { HospitalEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';

const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name="hospital" />
          </Card.Header>
          <Card.Meta>{entry.description}</Card.Meta>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default HospitalEntryDetail;
