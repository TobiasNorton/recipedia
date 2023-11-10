import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { type RootState } from '../../redux/root-reducer';
import AdvancedSearch from '../../components/advanced-search';
import { getSearchResults } from '../../redux/slices/search-results';
import { resetForm, setSearchQuery } from '../../redux/slices/search-form';
import { AppDispatch } from '../../redux/store';
import { useHistory } from 'react-router';

const Home = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const searchQuery = useSelector((state: RootState) => state.searchForm.searchQuery);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    dispatch(setSearchQuery(target.value));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getRecipes = async () => {
      await dispatch(getSearchResults({ searchQuery }));
      history.push('/search-results');
    };
    getRecipes();
  };

  const setToAdvancedSearch = () => {
    setIsAdvancedSearch(true);
    dispatch(resetForm());
  };

  const backToBasicSearch = () => {
    setIsAdvancedSearch(false);
    dispatch(resetForm());
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
    </div>
  );
};

export default Home;
