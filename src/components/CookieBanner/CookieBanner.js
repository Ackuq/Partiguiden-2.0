import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/styles';
import { Paper, Button, Slide, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';

import styles from './styles';

const cookies = new Cookies();

const useStyles = makeStyles(styles);

const CookieBanner = () => {
  const classes = useStyles();
  const [cookieConsent, setCookieConsent] = useState(true);

  useEffect(() => {
    if (!cookies.get('consent')) setCookieConsent(false);
  }, []);

  return (
    <React.Fragment>
      <Slide direction="up" in={!cookieConsent} mountOnEnter unmountOnExit>
        <Paper square classes={{ root: classes.cookieBannerContainer }}>
          <Typography variant="h6" align="center">
            Partiguiden.nu använder kakor för att anonymt analysera användares interaktion med
            hemsidan.
          </Typography>
          <div className={classes.buttonContainer}>
            <Button color="inherit" variant="outlined">
              <Link href="/kakpolicy">
                <Typography component="a" variant="button">
                  Läs mer
                </Typography>
              </Link>
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              classes={{ root: classes.acceptButton }}
              onClick={() => {
                setCookieConsent(true);
                cookies.set('consent', true, { path: '/' });
              }}
            >
              Jag godkänner
            </Button>
          </div>
        </Paper>
      </Slide>
    </React.Fragment>
  );
};

export default CookieBanner;