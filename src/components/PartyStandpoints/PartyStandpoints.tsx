import React, { useState } from 'react';

import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

import { PartyInfo } from '../../utils/getParties';
import PartyStandpoint from './PartyStandpoint';
import useStyles from './useStyles';
import { Standpoint } from '../../types/subjects';

interface Props {
  standpoints: Array<Standpoint>;
  party: PartyInfo;
}

const PartyStandpoints: React.FC<Props> = ({ standpoints, party }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const partyColor = party.color || 'red';

  const handleClick = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <div key={party.name} id={party.name} className={classes.partyContainer}>
      <ButtonBase
        onClick={handleClick}
        aria-expanded={visible}
        aria-label="Show more"
        classes={{ root: classes.partyTitle }}
        style={{ borderBottom: `2px solid ${partyColor}` }}
      >
        <>
          <Typography
            variant="h4"
            style={{ fontWeight: 300, marginBottom: '0.25rem', marginTop: '0.25rem' }}
          >
            {party.name}
          </Typography>
          <ArrowDownRounded
            style={{ color: partyColor }}
            classes={{ root: `${classes.arrow} ${visible ? classes.shown : ''}` }}
          />
        </>
      </ButtonBase>
      <Collapse in={visible} classes={{ container: classes.collapse }} timeout="auto" unmountOnExit>
        <Grid container spacing={3} style={{ marginTop: '0.5rem' }}>
          {standpoints.map((standpoint) => (
            <PartyStandpoint
              standpoint={standpoint}
              party={party}
              key={`${party.name}${standpoint.title}`}
            />
          ))}
        </Grid>
      </Collapse>
    </div>
  );
};

export default PartyStandpoints;