import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './style.scss';
import AdvancedSearch from '../../components/advanced-search';
import { setSearchResults } from '../../redux/slices/search-results';

const Home = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setSearchQuery(target.value);
    // dispatch(setKeyword(target.value));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let searchPath = `/search?query=${searchQuery}`
    // const intolerancesParam = selectedCheckboxIntolerances.length > 0 ? ``
    // history.push(`/search?query=${searchQuery}`);
    // To abstract this to its own hook, pass in searchQuery, selectedIntolerances, selectedCuisines
    try {
      // setIsSearchSubmitted(true);
      const queryString = `&query=${searchQuery}`;
      setSearchQuery(searchQuery);
      let recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=200`;

      if (searchQuery) {
        recipesSearchUrl = `${recipesSearchUrl}${queryString}`;
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

  const setToAdvancedSearch = () => {
    setIsAdvancedSearch(true);
    // setRecipes([]);
  };

  const backToBasicSearch = () => {
    setIsAdvancedSearch(false);
    // setRecipes([]);
  };

  return (
    <div className="home">
      {/* {!isSearchSubmitted ? ( */}
      <div className="overlay">
        <div className="search-form-container">
          <h1 className="main-header">Welcome to Recipedia</h1>
          <h3 className="sub-header">Recipes without the authors' life stories</h3>
          <h3 className="search-label">What's on the menu?</h3>
          {isAdvancedSearch ? (
            <AdvancedSearch backToBasicSearch={backToBasicSearch} />
          ) : (
            <form onSubmit={onSubmit}>
              <input
                className="text-field"
                type="text"
                name="keyword"
                onChange={handleKeywordChange}
                placeholder="Ex: Shrimp Scampi"
              ></input>
              <button className="search-button" type="submit">
                Search
              </button>
              <button className="advanced-button" onClick={() => setToAdvancedSearch()}>
                Advanced Search
              </button>
            </form>
          )}
        </div>
      </div>
      {/* )} */}
      <p>
        I created this using the{' '}
        <a href="https://spoonacular.com/food-api" target="_blank" rel="noreferrer">
          Spoonacular API
        </a>
      </p>
    </div>
  );
};

export default Home;
