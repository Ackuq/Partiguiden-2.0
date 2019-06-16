import React, { useState } from 'react';
import { Collapse, ButtonBase, Grid, Typography } from '@material-ui/core';
import { withStyles, styled } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import getPartyColor from '../../../../lib/getPartyColor';
import PartyOpinion from '../PartyOpinion';
import styles from './styles';

const PartyComponent = ({ classes, party }) => {
  const [visible, setVisible] = useState(false);
  const partyColor = getPartyColor(party.name);

  const PartyTitle = styled(ButtonBase)({
    border: `2px solid ${partyColor}`,
    width: '100%',
    borderRadius: '3rem',
    textAlign: 'center',
    padding: '0.75rem 0',
    backgroundColor: grey[100],
    '&:hover': {
      backgroundColor: grey[200]
    }
  });

  return (
    <React.Fragment>
      {party.data && (
        <div key={`${party.name}`} id={`${party.name}`} className={classes.partyStandpoint}>
          <PartyTitle onClick={() => setVisible(!visible)}>
            <Typography variant="h3" style={{ fontWeight: 300 }}>
              {party.name}
            </Typography>
          </PartyTitle>
          <Collapse in={visible} classes={{ container: classes.collapse }}>
            <Grid container spacing={3} style={{ marginTop: '0.5rem' }}>
              {party.data.map(subject => (
                <PartyOpinion
                  subject={subject}
                  partyName={party.name}
                  partyColor={partyColor}
                  key={`${party.name}${subject.name}`}
                />
              ))}
            </Grid>
          </Collapse>
        </div>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(PartyComponent);
