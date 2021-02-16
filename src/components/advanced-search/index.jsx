import React from 'react';
import './style.scss'
import { INTOLERANCES, CUISINES } from '../../constants'
import MultiSelectCheckbox from '../multi-select-checkbox';

const AdvancedSearch = ({ onSubmit, backToSimpleSearch, handleKeywordChange, handleCheckboxSelect }) => {

  const callOnSubmit = (event) => {
    onSubmit(event)
  }

  const handleChange = (event) => {
    handleKeywordChange(event)
  }

  const handleSelect = (selectedOptions, filterType) => {
    handleCheckboxSelect(selectedOptions, filterType)
  }

  return (

    <form className="advanced-search" onSubmit={callOnSubmit}>
      <input className="text-field" type="text" name="keyword" placeholder="Type a keyword" onChange={handleChange}></input>
      <button className="search-button" type="submit">
        Search
      </button>
      <button className="search-button" onClick={() => backToSimpleSearch()}>
        Back to Search
      </button>
      <div className="advanced-options">
        <div className="options-section-label">Intolerances to omit: </div>
        <MultiSelectCheckbox filterType="intolerances" options={INTOLERANCES} handleSelect={handleSelect} />
        <div className="options-section-label">Filter by cuisine-type:</div>
        <MultiSelectCheckbox filterType="cuisines" options={CUISINES} handleSelect={handleSelect} />
      </div>

    </form>
  )

}

export default AdvancedSearch;
