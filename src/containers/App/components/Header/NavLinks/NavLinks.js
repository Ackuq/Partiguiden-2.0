import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';

import { string, object } from 'prop-types';
import { Router } from '../../../../../lib/routes';
import styles from './styles';
import { useStateValue } from '../../../../../lib/stateProvider';

const useStyles = makeStyles(styles);

const getPages = () => [
  { href: '/', title: 'Hem' },
  {
    href: '/partiernas-standpunkter',
    title: 'Partiernas Ståndpunkter'
  },
  { href: '/riksdagsbeslut', title: 'Riksdagsbeslut' },
  { href: '/voteringar', title: 'Voteringar' },
  { href: '/ledamoter', title: 'Ledamöter' },
  { href: '/om-oss', title: 'Om oss' }
];

const NavLinks = ({ router }) => {
  const classes = useStyles();
  const dispatch = useStateValue()[1];

  const getInitialIndex = val => {
    const { route } = router;

    let index = getPages().findIndex(x => x.href === router.pathname);

    if (index < 0) {
      if (route === '/subject') index = 1;
      else if (route === '/beslut') index = 2;
      else if (route === '/votering') index = 3;
      else if (route === '/ledamot') index = 4;
      else index = val;
    }
    return index;
  };

  const [value, setValue] = useState(getInitialIndex(0));

  useEffect(() => {
    setValue(getInitialIndex(value));
  }, [router.pathname]);

  const renNavlink = ({ title, href }) => (
    <Tab classes={{ root: classes.navTab }} key={title} label={title} href={href} />
  );

  renNavlink.propTypes = {
    title: string.isRequired,
    href: string.isRequired
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);

    if (
      getPages()[newValue].title === 'Voteringar' ||
      getPages()[newValue].title === 'Riksdagsbeslut'
    ) {
      dispatch({ type: 'RESET_FILTER' });
    }

    Router.pushRoute(getPages()[newValue].href).then(() => window.scrollTo(0, 0));
  };

  return (
    <AppBar position="sticky">
      <Tabs
        variant="scrollable"
        classes={{
          scrollButtons: classes.scrollButton,
          scroller: classes.scrollTab
        }}
        value={value}
        onChange={handleChange}
      >
        {getPages().map(page => renNavlink(page))}
      </Tabs>
    </AppBar>
  );
};

NavLinks.propTypes = {
  router: object.isRequired
};

export default withRouter(NavLinks);