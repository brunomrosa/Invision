import React from 'react';
import { Helmet } from 'react-helmet';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <h1>Dashboard</h1>
    </Container>
  );
};

export default Dashboard;
