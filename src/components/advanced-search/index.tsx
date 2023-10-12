import React, { type FC, SyntheticEvent, ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import MultiSelectCheckbox from '../multi-select-checkbox';
import { INTOLERANCES, CUISINES } from '../../constants';
import { setSearchResults } from '../../redux/slices/search-results';
import './style.scss';

interface AdvancedSearchProps {
  backToBasicSearch: Function;
}

const AdvancedSearch = (props: AdvancedSearchProps) => {
  const { backToBasicSearch } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCheckboxIntolerances, setSelectedCheckboxIntolerances] = useState<string[]>([]);
  const [selectedCheckboxCuisines, setSelectedCheckboxCuisines] = useState<string[]>([]);
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let searchPath = `/search?query=${searchQuery}`
    // const intolerancesParam = selectedCheckboxIntolerances.length > 0 ? ``
    // history.push(`/search?query=${searchQuery}`);
    // To abstract this to its own hook, pass in searchQuery, selectedIntolerances, selectedCuisines
    try {
      // setIsSearchSubmitted(true);
      const queryString = `&query=${searchQuery}`;
      const intolerances = selectedCheckboxIntolerances.join(',');
      const intolerancesQueryString = `&intolerances=${intolerances}`;
      const cuisines = selectedCheckboxCuisines.join(',');
      const cuisinesQueryString = `&cuisine=${cuisines}`;

      setSearchQuery(searchQuery);

      let recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=200`;

      if (searchQuery) {
        recipesSearchUrl = `${recipesSearchUrl}${queryString}`;
      }
      if (intolerances && intolerances.length > 0) {
        recipesSearchUrl = `${recipesSearchUrl}${intolerancesQueryString}`;
      }
      if (cuisines && cuisines.length > 0) {
        recipesSearchUrl = `${recipesSearchUrl}${cuisinesQueryString}`;
      }

      const fetchRecipes = async () => {
        await axios.get(recipesSearchUrl).then((response) => {
          if (response.data && response.data.totalResults === 0) {
            // setCouldNotFindRecipes(true);
            // TODO: Handle couldNotFindRecipes
            console.log('COULD NOT FIND RECIPES');
          } else {
            console.log('response.data.results', response.data.results);
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
    setSearchQuery(target.value);
    // dispatch(setKeyword(target.value));
  };

  const handleCheckboxSelect = (filters: string[], filterType: string) => {
    if (filterType === 'intolerances') {
      setSelectedCheckboxIntolerances(filters);
    }
    if (filterType === 'cuisines') {
      setSelectedCheckboxCuisines(filters);
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
