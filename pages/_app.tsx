import { useEffect, useMemo, useState } from 'react';

import { AppProps } from 'next/app';

import { useMediaQuery, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider, css, ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import ToTopButton from '../src/components/ToTopButton';
import CookieBanner from '../src/components/CookieBanner';

import getTheme from '../src/lib/theme';
import * as gtag from '../src/utils/gtag';
import getCache from '../src/lib/getCache';

const cache = getCache();

const DARK_MODE_KEY = 'prefersDarkMode';

const getInitialDarkMode = (prefersDarkMode: boolean): boolean => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(DARK_MODE_KEY);
    // If we got a stored value, let it override the browser preference
    if (stored !== null) {
      return stored === 'true';
    }
  }
  // If no stored value, let the initial value be the browser preference
  return prefersDarkMode;
};

const setStoredDarkModeValue = (value: boolean) => {
  localStorage.setItem(DARK_MODE_KEY, value.toString());
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const [darkModeState, setDarkModeState] = useState<boolean>(getInitialDarkMode(prefersDarkMode));
  const theme = useMemo(() => getTheme(darkModeState), [darkModeState]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <CssBaseline />
          {/* <Header
          toggleDarkMode={() => {
            setDarkModeState((prevValue) => {
              const newValue = !prevValue;
              setStoredDarkModeValue(newValue);
              return newValue;
            });
          }}
        /> */}
          <main
            css={css`
              margin-bottom: 1rem;
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            `}
          >
            <Component {...pageProps} />
          </main>
          <Footer />
          <ToTopButton />
          <CookieBanner />
        </EmotionThemeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
