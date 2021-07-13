import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Paper, Button, Slide, Typography } from '@material-ui/core';
import { styled, Theme } from '@material-ui/core/styles';

import { COOKIE_POLICY } from '../../lib/routes';

const CookieBannerContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
  color: '#fff',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  padding: '2rem 0.125rem',
  zIndex: 9999,
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
});

const COOKIE_CONSENT_KEY = 'cookie_consent';

const CookieBanner: React.FC = () => {
  const [cookieConsent, setCookieConsent] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      setCookieConsent(false);
    }
  }, []);

  return (
    <>
      <Slide direction="up" in={!cookieConsent} mountOnEnter unmountOnExit>
        <CookieBannerContainer square>
          <Typography variant="h6" align="center">
            Partiguiden använder kakor för att anonymt analysera användares interaktion med
            hemsidan.
          </Typography>
          <ButtonContainer>
            <Button
              color="inherit"
              variant="outlined"
              style={{
                marginRight: '3px',
              }}
            >
              <Link href={COOKIE_POLICY} passHref>
                <Typography component="a" variant="button" color="inherit">
                  Läs mer
                </Typography>
              </Link>
            </Button>
            <Button
              style={{
                marginLeft: '3px',
              }}
              color="inherit"
              variant="outlined"
              onClick={() => {
                setCookieConsent(true);
                localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(true));
              }}
            >
              Jag godkänner
            </Button>
          </ButtonContainer>
        </CookieBannerContainer>
      </Slide>
    </>
  );
};

export default CookieBanner;
