import React from 'react';

import { Typography } from '@material-ui/core';

interface Props {
  decision: string;
  description: string;
}

const Decision: React.FC<Props> = ({ decision, description }) => (
  <div style={{ marginBottom: '1rem' }}>
    <Typography variant="h5" color="inherit" component="span" gutterBottom>
      Beslut
    </Typography>
    <Typography variant="body1">{decision}</Typography>
    <Typography
      variant="h5"
      color="inherit"
      component="span"
      gutterBottom
      style={{ marginTop: '0.5rem' }}
    >
      Beslut i korthet
    </Typography>
    <div dangerouslySetInnerHTML={{ __html: description }} />
  </div>
);

export default Decision;