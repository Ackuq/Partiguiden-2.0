import React from 'react';

import { Grid, Link, Typography } from '@material-ui/core';
import { styled, Theme } from '@material-ui/core/styles';

import { ResponsiveAd } from '../Ad';

const FooterContent = styled('footer')(({ theme }: { theme: Theme }) => ({
  padding: '1.5rem 0',
  color: theme.palette.primary.contrastText,
  background:
    theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.primary.main,
  boxShadow: '0 -1px 3px rgba(34, 25, 25, 0.4)',
  textAlign: 'center',
}));

const Footer: React.FC = () => (
  <>
    <ResponsiveAd />
    <FooterContent>
      <Grid direction="column" justify="center" container>
        <Grid item>
          <Typography align="center" color="inherit" variant="subtitle1" component="span">
            © Axel Pettersson 2021
          </Typography>
        </Grid>
        <Grid item>
          <Link
            align="center"
            color="inherit"
            variant="subtitle1"
            href="mailto:hello@partiguiden.se"
          >
            hello@partiguiden.se
          </Link>
        </Grid>
      </Grid>
    </FooterContent>
  </>
);

export default Footer;