import React, { type FC, SyntheticEvent, ChangeEvent } from 'react';
import './style.scss';
import { INTOLERANCES, CUISINES } from '../../constants';
import MultiSelectCheckbox from '../multi-select-checkbox';

interface AdvancedSearchProps {
  onSubmit: Function;
  backToSimpleSearch: Function;
  handleKeywordChange: Function;
  handleCheckboxSelect: Function;
}

const AdvancedSearch = (props: AdvancedSearchProps) => {
  const { onSubmit, backToSimpleSearch, handleKeywordChange, handleCheckboxSelect } = props;

  const callOnSubmit = (event: SyntheticEvent) => {
    onSubmit(event);
  };

  const handleChange = (event: ChangeEvent) => {
    handleKeywordChange(event);
  };

  const handleSelect = (selectedOptions: string[], filterType: string) => {
    handleCheckboxSelect(selectedOptions, filterType);
  };

  return (
    <form className="advanced-search" onSubmit={callOnSubmit}>
      <input
        className="text-field"
        type="text"
        name="keyword"
        placeholder="Type a keyword"
        onChange={handleChange}
      ></input>
      <button className="search-button" type="submit">
        Search
      </button>
      <button className="advanced-button" onClick={() => backToSimpleSearch()}>
        Back to Basic Search
      </button>
      <div className="advanced-options">
        <MultiSelectCheckbox
          filterType="intolerances"
          options={INTOLERANCES}
          handleSelect={handleSelect}
          label="Intolerances to omit:"
        />
        <MultiSelectCheckbox
          filterType="cuisines"
          options={CUISINES}
          handleSelect={handleSelect}
          label="Filter by cuisine-type:"
        />
      </div>
    </form>
  );
};

export default AdvancedSearch;
