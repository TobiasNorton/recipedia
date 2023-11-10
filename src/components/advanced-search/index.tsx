import React, { type FC, SyntheticEvent, ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelectCheckbox from '../multi-select-checkbox';
import { INTOLERANCES, CUISINES } from '../../constants';
import { getSearchResults, setSearchResults } from '../../redux/slices/search-results';
import { setSearchQuery, setIntolerances, setCuisines } from '../../redux/slices/search-form';
import { type RootState } from '../../redux/root-reducer';
import './style.scss';
import { AppDispatch } from '../../redux/store';

interface AdvancedSearchProps {
  backToBasicSearch: Function;
}

const AdvancedSearch = (props: AdvancedSearchProps) => {
  const { backToBasicSearch } = props;
  const searchQuery = useSelector((state: RootState) => state.searchForm.searchQuery);
  const selectedIntolerances = useSelector((state: RootState) => state.searchForm.intolerances);
  const selectedCuisines = useSelector((state: RootState) => state.searchForm.cuisines);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getRecipes = async () => {
      await dispatch(getSearchResults({ searchQuery, selectedIntolerances, selectedCuisines }));
      history.push('/search-results');
    };
    getRecipes();
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    dispatch(setSearchQuery(target.value));
  };

  const handleCheckboxSelect = (filters: string[], filterType: string) => {
    if (filterType === 'intolerances') {
      dispatch(setIntolerances(filters));
    }
    if (filterType === 'cuisines') {
      dispatch(setCuisines(filters));
    }
  };

  return (
    <form className="advanced-search" onSubmit={onSubmit}>
      <input
        className="text-field"
        type="text"
        name="keyword"
        placeholder="Type a keyword"
        onChange={handleKeywordChange}
      ></input>
      <button className="search-button" type="submit">
        Search
      </button>
      <button className="advanced-button" onClick={() => backToBasicSearch()}>
        Back to Basic Search
      </button>
      <div className="advanced-options">
        <MultiSelectCheckbox
          filterType="intolerances"
          options={INTOLERANCES}
          handleSelect={handleCheckboxSelect}
          label="Intolerances to omit:"
        />
        <MultiSelectCheckbox
          filterType="cuisines"
          options={CUISINES}
          handleSelect={handleCheckboxSelect}
          label="Filter by cuisine-type:"
        />
      </div>
    </form>
  );
};

export default AdvancedSearch;
