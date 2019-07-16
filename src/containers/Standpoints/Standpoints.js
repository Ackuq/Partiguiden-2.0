import React from 'react';

import PartyComponent from './PartyComponent';

const Subject = ({ partyData }) =>
  partyData.map(party => <PartyComponent key={party.name} party={party} />);

export default Subject;
