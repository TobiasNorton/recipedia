import React, { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import SearchResults from '../../components/results';
import AdvancedSearch from '../../components/advanced-search';

const Home = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCheckboxIntolerances, setSelectedCheckboxIntolerances] = useState<string[]>([]);
  const [selectedCheckboxCuisines, setSelectedCheckboxCuisines] = useState<string[]>([]);
  const [recipes, setRecipes] = useState([]);
  const [couldNotFindRecipes, setCouldNotFindRecipes] = useState(false);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  const resultsPerPage = 10;
  const numberOfPages = Math.ceil(recipes.length / resultsPerPage);
  const indexOfLastRecipe = currentPage * resultsPerPage - 1;
  const indexOfFirstRecipe = indexOfLastRecipe - resultsPerPage + 1;
  const recipesToDisplay = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe + 1);
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= numberOfPages; i++) {
      numbers.push(i);
    }
    setPageNumbers(numbers);
  }, [recipes]);

  const refreshSearch = () => {
    setSearchQuery('');
    setRecipes([]);
    setCouldNotFindRecipes(false);
    setCurrentPage(1);
    setIsSearchSubmitted(false);
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setSearchQuery(target.value);
  };

  const handleCheckboxSelect = (filters: string[], filterType: string) => {
    console.log('filters', filters);
    if (filterType === 'intolerances') {
      setSelectedCheckboxIntolerances(filters);
    }
    if (filterType === 'cuisines') {
      setSelectedCheckboxCuisines(filters);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    try {
      search(event);
    } catch (error) {
      // TODO: Add toast error, or UI indication of some kind
      console.log(error);
    }
  };

  const search = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsSearchSubmitted(true);
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

    axios.get(recipesSearchUrl).then((response) => {
      setRecipes(response.data && response.data.results);
      if (response.data && response.data.totalResults === 0) {
        setCouldNotFindRecipes(true);
      }
    });
  };

  const setToAdvancedSearch = () => {
    setIsAdvancedSearch(true);
    setRecipes([]);
  };

  const backToSimpleSearch = () => {
    setIsAdvancedSearch(false);
    setRecipes([]);
  };

  return (
    <div className="home">
      {!isSearchSubmitted ? (
        <div className="search-form-container">
          <h1>Welcome to Recipedia</h1>
          <h3>What are you hungry for?</h3>
          {!isAdvancedSearch ? (
            <form onSubmit={onSubmit}>
              <input
                className="text-field"
                type="text"
                name="keyword"
                onChange={handleKeywordChange}
              ></input>
              <button className="search-button" type="submit">
                Search
              </button>
              <button className="advanced-button" onClick={() => setToAdvancedSearch()}>
                Advanced
              </button>
            </form>
          ) : (
            <AdvancedSearch
              onSubmit={onSubmit}
              backToSimpleSearch={backToSimpleSearch}
              handleKeywordChange={handleKeywordChange}
              handleCheckboxSelect={handleCheckboxSelect}
            />
          )}
        </div>
      ) : (
        <SearchResults
          couldNotFindRecipes={couldNotFindRecipes}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          searchQuery={searchQuery}
          setCurrentPage={setCurrentPage}
          recipes={recipes}
          recipesToDisplay={recipesToDisplay}
          refreshSearch={refreshSearch}
        />
      )}

      <p>
        I created this using the{' '}
        <a href="https://spoonacular.com/food-api" target="_blank">
          Spoonacular API
        </a>
      </p>
    </div>
  );
};

export default Home;
