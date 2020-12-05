import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import { Multiselect } from 'multiselect-react-dropdown';
import '../advanced-search/style.scss'
import { INTOLERANCES, CUISINES } from '../../constants'
import MultiSelectCheckbox from '../multi-select-checkbox';

const AdvancedSearch = ({ onSubmit, backToSimpleSearch }) => {

  const [selectedIntolerances, setSelectedIntolerances] = useState([])
  const [selectedCuisines, setSelectedCuisines] = useState([])

  return (

    <form className="advanced-search">
      <input className="text-field" type="text" name="keyword" placeholder="Type a keyword"></input>
      <button className="search-button" type="submit">
        Search
      </button>
      <button className="search-button" onClick={() => backToSimpleSearch()}>
        Back to Search
      </button>
      <div className="advanced-options">
        <div className="options-section-label">Intolerances to omit: </div>
        <MultiSelectCheckbox />
        <div className="options-section-label">Filter by cuisine-type:</div>
      </div>

    </form>
  )

}

export default AdvancedSearch;
