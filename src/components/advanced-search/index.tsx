import React, { type FC, SyntheticEvent, ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import MultiSelectCheckbox from '../multi-select-checkbox';
import { INTOLERANCES, CUISINES } from '../../constants';
import { setSearchResults } from '../../redux/slices/search-results';
import { setSearchQuery, setIntolerances, setCuisines } from '../../redux/slices/search-form';
import { type RootState } from '../../redux/root-reducer';
import './style.scss';

interface AdvancedSearchProps {
  backToBasicSearch: Function;
}

const AdvancedSearch = (props: AdvancedSearchProps) => {
  const { backToBasicSearch } = props;

  const searchQuery = useSelector((state: RootState) => state.searchForm.searchQuery);
  const selectedIntolerances = useSelector((state: RootState) => state.searchForm.intolerances);
  const selectedCuisines = useSelector((state: RootState) => state.searchForm.cuisines);
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let searchPath = `/search?query=${searchQuery}`
    // const intolerancesParam = selectedIntolerances.length > 0 ? ``
    // history.push(`/search?query=${searchQuery}`);
    // To abstract this to its own hook, pass in searchQuery, selectedIntolerances, selectedCuisines
    try {
      // setIsSearchSubmitted(true);
      const queryString = `&query=${searchQuery}`;
      const intolerancesString = selectedIntolerances.join(',');
      const intolerancesQueryString = `&intolerances=${intolerancesString}`;
      const cuisinesString = selectedCuisines.join(',');
      const cuisinesQueryString = `&cuisine=${cuisinesString}`;

      dispatch(setSearchQuery(searchQuery));

      let recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=200`;

      if (searchQuery) {
        recipesSearchUrl = `${recipesSearchUrl}${queryString}`;
      }
      if (intolerancesString?.length > 0) {
        recipesSearchUrl = `${recipesSearchUrl}${intolerancesQueryString}`;
      }
      if (cuisinesString?.length > 0) {
        recipesSearchUrl = `${recipesSearchUrl}${cuisinesQueryString}`;
      }

      const fetchRecipes = async () => {
        await axios.get(recipesSearchUrl).then((response) => {
          if (response.data && response.data.totalResults === 0) {
            // setCouldNotFindRecipes(true);
            // TODO: Handle couldNotFindRecipes
            console.log('COULD NOT FIND RECIPES');
          } else {
            console.log('response.data', response.data);
            // TODO: Check up on this
            dispatch(setSearchResults(response.data.results));
            history.push('/search-results');
          }
        });
      };
      fetchRecipes();
    } catch (error) {
      // TODO: Add toast error, or UI indication of some kind
      console.error(error);
    }
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    dispatch(setSearchQuery(target.value));
    // dispatch(setKeyword(target.value));
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
