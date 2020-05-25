import React from 'react';
import { Divider } from '@material-ui/core';

import { authorityTable } from '../../utils';
import FilterContainer, { useFilter, FilterSearch, FilterList } from '../Filter';

const FilterScreen = () => {
  const {
    state: { search, org },
    dispatch,
  } = useFilter();

  // Search functions
  const updateSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH', searchInput: value });
  };
  // List functions
  const isChecked = (el: string) => org.includes(el);
  const updateList = (el: string) => {
    if (isChecked(el)) dispatch({ type: 'REMOVE_ORG_FROM_FILTER', org: el });
    else dispatch({ type: 'ADD_ORG_TO_FILTER', org: el });
  };
  const getText = (el: string) => authorityTable[el].desc;
  const getKey = (el: string) => el;

  return (
    <FilterContainer>
      <FilterSearch updateSearch={updateSearch} search={search} />
      <Divider />
      <FilterList
        list={Object.keys(authorityTable)}
        isChecked={isChecked}
        updateList={updateList}
        getText={getText}
        getKey={getKey}
      />
    </FilterContainer>
  );
};

export default FilterScreen;
