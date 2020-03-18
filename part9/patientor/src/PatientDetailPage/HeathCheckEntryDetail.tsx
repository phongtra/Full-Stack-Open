import React from 'react';
import { HealthCheckEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';

const HeathCheckEntryDetail: React.FC<{ entry: HealthCheckEntry }> = ({
  entry
}) => {
  let color = '';
  switch (entry.healthCheckRating) {
    case 0:
      color = 'green';
      break;
    case 1:
      color = 'yellow';
      break;
    case 2:
      color = 'orange';
      break;
    case 3:
      color = 'red';
      break;
    default:
      color = 'grey';
      break;
  }
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name="user md" />
          </Card.Header>
          <Card.Meta>{entry.description}</Card.Meta>
          <Icon name="heart" color={color as any} />
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default HeathCheckEntryDetail;
