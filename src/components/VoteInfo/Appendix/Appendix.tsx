import React from 'react';

import { Typography, Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { VoteAppendixItem } from '../../../types/voting';

interface Props {
  appendix: Array<VoteAppendixItem>;
}

const Appendix: React.FC<Props> = ({ appendix }) => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="h5" color="inherit" component="span" gutterBottom>
        Bilaga
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {appendix.map((item) => (
          <Link
            href={item.fil_url}
            key={item.fil_url}
            target="_blank"
            rel="noopener"
            variant="body1"
            color={theme.palette.type === 'dark' ? 'secondary' : 'primary'}
          >
            {item.titel} {item.dok_id}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Appendix;