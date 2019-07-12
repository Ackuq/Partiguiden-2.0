import React from 'react';
import { Container } from '@material-ui/core';
import { object } from 'prop-types';

import Filter, { reducer } from '../../components/ParlimentFilter';
import { FilterProvider } from '../../components/Filter';
import VoteList from './components/VoteList';

const Votes = ({ query }) => {
  let initialOrg = [];
  if (query.org) {
    initialOrg = Array.isArray(query.org) ? query.org : [query.org];
  }
  return (
    <FilterProvider initialState={{ org: initialOrg, search: query.sok || '' }} reducer={reducer}>
      <div style={{ display: 'flex' }}>
        <Container maxWidth="md">
          <VoteList />
        </Container>
        <Filter />
      </div>
    </FilterProvider>
  );
};

Votes.propTypes = {
  query: object.isRequired,
};

export default Votes;
