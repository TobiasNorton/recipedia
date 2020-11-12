import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import { Multiselect } from 'multiselect-react-dropdown';
import '../advanced-search/style.scss'
import { INTOLERANCES, CUISINES } from '../../constants'

const AdvancedSearch = ({ onSubmit, backToSimpleSearch }) => {

  const [selectedIntolerances, setSelectedIntolerances] = useState([])
  const [selectedCuisines, setSelectedCuisines] = useState([])

  const blah = (ints) => {
    setSelectedIntolerances(ints)
    console.log(selectedIntolerances)
  }

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
        <Multiselect
          options={INTOLERANCES} // Options to display in the dropdown
          selectedValues={selectedIntolerances} // Preselected value to persist in dropdown
          onSelect={() => blah(selectedIntolerances)} // Function will trigger on select event
          // onRemove={} // Function will trigger on remove event
          displayValue="label" // Property label to display in the dropdown options
        />
        <div className="options-section-label">Filter by cuisine-type:</div>
        <Multiselect
          options={CUISINES} // Options to display in the dropdown
          // selectedValues={selectedCuisines} // Preselected value to persist in dropdown
          // onSelect={setSelectedCuisines(selectedCuisines)} // Function will trigger on select event
          // onRemove={} // Function will trigger on remove event
          displayValue="label" // Property name to display in the dropdown options
        />
      </div>

    </form>
  )

}

export default AdvancedSearch;
