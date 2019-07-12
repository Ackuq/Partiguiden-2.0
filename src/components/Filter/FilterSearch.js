import React from 'react';
import { InputBase, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { string, func } from 'prop-types';

const FilterSearch = ({ search, updateSearch }) => (
  <div style={{ padding: '0.5rem 1rem 0 1rem' }}>
    <InputBase
      value={search}
      onChange={event => {
        window.scrollTo(0, 0);
        updateSearch(event.target.value);
      }}
      style={{ fontSize: '1.25rem' }}
      fullWidth
      placeholder="Sök..."
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  </div>
);

FilterSearch.propTypes = {
  search: string.isRequired,
  updateSearch: func.isRequired,
};

export default FilterSearch;
